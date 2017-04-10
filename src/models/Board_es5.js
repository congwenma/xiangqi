import { Coordinate, expand } from './Matrix'
import Avatar, {
  AvatarDictionary,
  Cannon,
  Chariot,
  General,
  Guard,
  Knight,
  Minister,
  Pawn
} from './Avatar';
import EvalModel from '../algorithm/EvalModel'

const identity = id => id

// polyfill for subclassing arrays
export default function Board({ width = 9, height = 10, pieces } = {}) {
  var arr = expand(width).map((colX, x) =>
    expand(height).map((coord, y) =>
      new Coordinate(x, y)
    )
  )

  var properties = [
    {
      name: 'toValues',
      prop: {
        get: function() {
          return this.map(
            xCol => xCol.map(coord => coord.value)
          )
        }
      }
    }, {
      name: 'byRows',
      prop: {
        get: function() {
          var arr = Object.keys([...Array(this[0].length)]) // construct array of length = num of rows
            .map(i => [])

          this.forEach(xCol => {
            xCol.forEach(
              (coord, y) => arr[y].push(coord)
            )
          })

          return arr
        }
      }
    }, {
      name: 'all',
      prop: {
        get: function() {
          return this.reduce((coll, xCol, x) =>
            coll.concat(
              xCol.map((coord, y) => (
                { coord, position: [x, y] }
              ))
            ),
            []
          )
        }
      }
    }, {
      name: 'vacant',
      prop: {
        get: function() {
          return this.all.filter(({ coord }) => coord == null)
        }
      }
    }, {
      name: 'alivePieces',
      prop: {
        get: function() {
          return this.pieces.filter(p => p.isAlive)
        }
      }
    }, {
      name: 'toSingle',
      prop: {
        get: function() {
          var grid = expand(9).map(
            x => expand(10).map(() => '.')
          )
          this.pieces.filter(p => p.isAlive).forEach(
            ({ toSingle, position: { x, y } }) => {
              grid[x][y] = toSingle
            }
          )
          return grid
        }
      }
    }, {
      name: 'checkForVictory',
      prop: {
        get: function() {
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
      }
    }
  ]

  Object.assign(arr, {
    pieces: pieces || [
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
      new Pawn({ faction: 'black', position: { x: 8, y: 3 } })
    ],

    logs: [],
    col(x) { return this[x] },
    row(y) { return [...this.map(col => col[y])] },

    toString() {
      return [
        '',
        ...this.toSingle.map(x => x.join(' ')),
        ''
      ].join('\n')
    },

    eval() {
      this.evalModel = this.evalModel || new EvalModel
      return this.evalModel.eval(this, 'red')
    },

    _flushPieces() {
      this.pieces.map(piece => {
        const { x, y } = piece.position
        this[x][y].piece = piece
        piece.board = this
      })
    },

    at({ x, y }) {
      return this[x] && this[x][y] || null
    },

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
    },

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
    },

    view() { console.info('Current Board:\n', this.toString()) },
    allPossibleMoves(isMax) {
      const pieces = this.alivePieces.filter(p => p.isRed === isMax)
      return pieces.reduce(
        (acc, piece) => [...acc, ...piece.moves],
        []
      )
    },
  })

  arr._flushPieces()

  properties.forEach(({ name, prop }) =>
    Object.defineProperty(arr, name, prop)
  )

  return arr
}

Board.read = function(singleCharRows) {
  var pieces = singleCharRows.map((xRow, x) => {
    return xRow.split(' ').map((char, y) => {
      var avatarClass = AvatarDictionary.get(char.toUpperCase())
      if (avatarClass) {
        var faction = /[a-z]/.test(char) ? 'red' : 'black'
        return new avatarClass({ faction, position: { x, y } })
      }
    }).filter(identity)
  }).reduce((arr, items) => arr.concat(items), [])

  var board = Board({ pieces })
  return board
}

Board.from = function (_2dArray) {
  const [width, height] = [_2dArray.length, _2dArray[0].length]
  const inst = Board({ width, height })

  // inserting values into the inst
  _2dArray.forEach((xCol, x) =>
    xCol.forEach((value, y) =>
      inst[x][y] = new Coordinate(x, y, value)
    )
  )
  return inst
}
