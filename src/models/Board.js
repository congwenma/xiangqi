import Avatar, {
  AvatarDictionary,
  Cannon,
  Chariot,
  General,
  Guard,
  Knight,
  Minister,
  Pawn
} from './Avatar'
import Matrix, { expand } from './Matrix'
import _ from 'lodash'
import EvalModel from '../algorithm/EvalModel'

const identity = id => id


//    0 1 2 3 4 5 6 7 8
//  -------------------
// 0| R K M G B G M K R
// 1| . . . .>.<. . . .
// 2| . C . . . . . C .
// 3| P . P . P . P . P
// 4| -----------------
// 5| -----------------
// 6| p . p . p . p . p
// 7| . c . . . . . c .
// 8| . . . .>.<. . . .
// 9| r k m g b g m k r
//         \
//       (2, 9) (x, y)
export default class Board extends Matrix{
  // static constants
  static get BOARD_WIDTH() { return 9 }
  static get BOARD_HEIGHT() { return 10 }
  static get STANDARD_SET() {
    return [
      new Chariot({ faction: 'red', position: { x: 0, y: 9 } }),
      new Chariot({ faction: 'red', position: { x: 8, y: 9 } }),
      new Knight({ faction: 'red', position: { x: 1, y: 9 } }),
      new Knight({ faction: 'red', position: { x: 7, y: 9 } }),
      new Minister({ faction: 'red', position: { x: 2, y: 9 } }),
      new Minister({ faction: 'red', position: { x: 6, y: 9 } }),
      new Guard({ faction: 'red', position: { x: 3, y: 9 } }),
      new Guard({ faction: 'red', position: { x: 5, y: 9 } }),
      new General({ faction: 'red', position: { x: 4, y: 9 } }),
      new Cannon({ faction: 'red', position: { x: 1, y: 7 } }),
      new Cannon({ faction: 'red', position: { x: 7, y: 7 } }),
      new Pawn({ faction: 'red', position: { x: 0, y: 6 } }),
      new Pawn({ faction: 'red', position: { x: 2, y: 6 } }),
      new Pawn({ faction: 'red', position: { x: 4, y: 6 } }),
      new Pawn({ faction: 'red', position: { x: 6, y: 6 } }),
      new Pawn({ faction: 'red', position: { x: 8, y: 6 } }),

      new Chariot({ faction: 'black', position: { x: 0, y: 0 } }),
      new Chariot({ faction: 'black', position: { x: 8, y: 0 } }),
      new Knight({ faction: 'black', position: { x: 1, y: 0 } }),
      new Knight({ faction: 'black', position: { x: 7, y: 0 } }),
      new Minister({ faction: 'black', position: { x: 2, y: 0 } }),
      new Minister({ faction: 'black', position: { x: 6, y: 0 } }),
      new Guard({ faction: 'black', position: { x: 3, y: 0 } }),
      new Guard({ faction: 'black', position: { x: 5, y: 0 } }),
      new General({ faction: 'black', position: { x: 4, y: 0 } }),
      new Cannon({ faction: 'black', position: { x: 1, y: 2 } }),
      new Cannon({ faction: 'black', position: { x: 7, y: 2 } }),
      new Pawn({ faction: 'black', position: { x: 0, y: 3 } }),
      new Pawn({ faction: 'black', position: { x: 2, y: 3 } }),
      new Pawn({ faction: 'black', position: { x: 4, y: 3 } }),
      new Pawn({ faction: 'black', position: { x: 6, y: 3 } }),
      new Pawn({ faction: 'black', position: { x: 8, y: 3 } }),
    ]
  }

  constructor({ pieces } = {}) {
    super({
      width: Board.BOARD_WIDTH,
      height: Board.BOARD_HEIGHT
    });

    this.pieces = pieces || Board.STANDARD_SET

    this._flushPieces()
    this.logs = []
  }

  // pretty much only used by constructor
  _flushPieces() {
    // see /diary/wierd variable scoping issue.png
    this.pieces.map(piece => {
      const { x, y } = piece.position

      // update the `matrix.coordinates` to update their pieces
      this[x][y].piece = piece
      piece.board = this
    })
  }

  static read(singleCharRows) {
    var pieces = singleCharRows.map((xRow, x) => {
      return xRow.split(' ').map((char, y) => {
        var avatarClass = AvatarDictionary.get(char.toUpperCase())
        if (avatarClass) {
          var faction = /[a-z]/.test(char) ? 'red' : 'black'
          return new avatarClass({ faction, position: { x, y } })
        }
      }).filter(identity)
    }).reduce((arr, items) => arr.concat(items), [])

    var board = new Board({ pieces })
    return board
  }

  get all() {
    return this.reduce((coll, xCol, x) =>
      coll.concat(
        xCol.map((coord, y) => (
          { coord, position: [x, y] }
        ))
      ),
      []
    )
  }

  get vacant() {
    return this.all.filter(({ coord }) => coord == null)
  }

  get alivePieces() { return this.pieces.filter(p => p.isAlive) }

  // return the coord at the location is doesn't exist, return null
  at({ x, y }) {
    return this[x] && this[x][y] || null
  }

  // return the piece to its original position inthe matrix, simple implementation
  backPiece(piece, originalPiece, fromPosition) {
    var { x: fromX, y: fromY } = fromPosition
    var {
      position: { x: currX, y: currY },
      position: currPosition
    } = piece

    this.logs.push(
      `#BACK: moved ${piece.toSingle} back to (${fromX}, ${fromY})` +
      (originalPiece ? `moved ${originalPiece.toSingle} to (${currX}, ${currY})` : '')
    )

    // move initPiece back
    piece.placeOn(fromPosition)
    this.at(fromPosition).piece = piece

    // move targetPiece(originalPiece) back
    this.at(currPosition).piece = null
    if (originalPiece) {
      originalPiece.placeOn(currPosition)
    }
  }

  movePiece(initPiece, newPosition) {
    const { x: origX, y: origY } = initPiece.position
    const { x: newX, y: newY } = newPosition
    const targetPiece = this[newX][newY].piece

    this.logs.push(
      `#MOVE: moved ${initPiece.toSingle} from (${origX}, ` +
      (targetPiece ? `${origY}) to (${newX}, ${newY}), killed ${targetPiece.toSingle}` : '')
    )

    this[origX][origY].piece.placeOn(newPosition)
    this[origX][origY].piece = null
    if (targetPiece) {
      targetPiece.position = { x: -1, y: -1 } // killed in action
    }
    return targetPiece
  }

  view() { console.info('Current Board:\n', this.toString()) }

  get toSingle() {
    var grid = expand(Board.BOARD_WIDTH).map(
      x => expand(Board.BOARD_HEIGHT).map(() => '.')
    )
    this.pieces.filter(p => p.isAlive).forEach(
      ({ toSingle, position: { x, y } }) => {
        grid[x][y] = toSingle
      }
    )
    return grid
  }

  static get MAIN_PIECES() { return [Chariot, Knight, Cannon, Minister, Guard, General] }
  static get ALPHA_PIECES() { return [Chariot, Knight, Cannon] }

  // Red is max player
  allPossibleMoves(isMax, { isBeingChecked, optimize = true } = {}) {
    let piecesToConsider = this.alivePieces.filter(p => p.isRed === isMax)

    if (optimize) {
      if (isBeingChecked) {
        piecesToConsider = piecesToConsider.filter(p => Board.MAIN_PIECES.includes(p.constructor))
      }
      else if (piecesToConsider.length > 13) {
        piecesToConsider = piecesToConsider.filter(p => Board.ALPHA_PIECES.includes(p.constructor))
      }
    }
    return piecesToConsider.reduce(
      (acc, piece) => [...acc, ...piece.moves],
      []
    )
  }
  get checkForVictory() {
    const { pieces } = this
    let generalsFaction = pieces
      .filter(p =>
        p.name === 'General' && p.isAlive
      ).map(g => g.faction)
    if (!generalsFaction.includes('red')) {
      return 'black'
    }
    else if (!generalsFaction.includes('black')) {
      return 'red'
    }
    else { return 'x' }
  }


  // R . . P . . p . . r
  // K . C . . . . c . k
  // M . . P . . p . . m
  // G . . . . . . . . g
  // B . . P . . p . . b
  // G . . . . . . . . g
  // M . . P . . p . . m
  // K . C . . . . c . k
  // R . . P . . p . . r
  toString() {
    return [
      '',
      ...this.toSingle.map(x => x.join(' ')),
      ''
    ].join('\n')
  }

  eval() {
    this.evalModel = this.evalModel || new EvalModel
    return this.evalModel.eval(this, 'red')
  }

  // Useless

  // NOT SURE IF USABLE
  static isInside({ x, y }) {
    return x < Board.BOARD_WIDTH && y < Board.BOARD_HEIGHT &&
      x >= 0 && y >= 0
  }

  // flip top and bottom pieces
  flip () {
    var newBoard = new this.constructor
    newBoard.pieces = this.pieces.map(piece => piece.invert())
    newBoard._flushPieces()
    return newBoard
  }
}
