import Board from '../../src/models/Board'
import Avatar from '../../src/models/Avatar'
const nit = () => {}
const ndescribe = () => {}

describe('Board', () => {
  var board
  describe('#constructor', () => {
    beforeEach(() => { board = new Board() })

    it('return an array [9] x [10]', () => {
      expect(board.length).toBe(9)
      expect(board[0].length).toBe(10)
    })

    it('returns 32 pieces', () => {
      expect(board.pieces.length).toBe(32)
    })

    it('return coordinates with piece associated', () => {
      expect(board[0][0].constructor).toBe(Board.Coordinate)
      expect(board[0][0].piece instanceof Avatar).toBe(true)
    })
  })

  beforeAll(() => {
    board = new Board
  })

  nit('#view', () => board.view())

  describe('#read', () => {
    beforeEach(() => {
      board = Board.read([
        'R . . P . . . . . r',
        'K . C . . . . c . k',
        'M . . P . . p . . m',
        'G . . . . . . . . g',
        'B . . P . . p . . b',
        'G . . . . . . . . g',
        'M . . P . . p . . m',
        'K . C . . . . c . k',  // [1, x]
        'R . . P . . p . . r',  // [0, x]
      ])
    })
    it('return 31 pieces', () => {
      expect(board.pieces.length).toBe(31)
    })
  })

  ndescribe('#flip', () => {
    var flippedBoard

    it('before the flip', () => {
      expect(board.toSingle[0].join('')).toEqual('R..P..p..r')
    })

    describe('after flipped', () => {
      beforeEach(() => {
        flippedBoard = board.flip()
      })

      it('flips the board top to bottom', () => {
        expect(flippedBoard.toSingle[0].join('')).toEqual('r..p..P..R')
      })

      it('does not mutate', () => {
        expect(board.toSingle[0].join('')).toEqual('R..P..p..r')
      })
    })
  })

  describe('#movePiece', () => {
    beforeAll(() => board = new Board)
    afterAll(() => board = new Board) //reset

    it('moves the piece onto its new specified position, return the fallen enemy unit', () => {
      var initPiece = board[0][0].piece
      var targetPiece = board[0][6].piece
      expect(initPiece.toSingle).toBe('R')
      expect(targetPiece.toSingle).toBe('p')

      var result = board.movePiece(initPiece, targetPiece.position) // technically not possible

      // verify the outcome
      expect(initPiece.position).toEqual({ x: 0, y: 6 })
      expect(targetPiece.position).toEqual({ x: -1, y: -1 })

      expect(result).toBe(targetPiece)
      expect(board[0][0].piece).toBe(null)
      expect(board[0][6].piece).toBe(initPiece)
    })
  })

  describe('#backPiece', () => {
    afterAll(() => board = new Board) //reset
    describe('after a kill', () => {
      var initPosition = { x: 0, y: 0 }
      var targetPosition = { x: 0, y: 6 }
      beforeEach(function() {
        this.initPiece = board.at(initPosition).piece
        this.targetPiece = board.at(targetPosition).piece
        board.movePiece(this.initPiece,targetPosition)
      })

      it('moves the piece back to its original position', function() {
        board.backPiece(this.initPiece, this.targetPiece, { x: 0, y: 0 })
        expect(this.initPiece.position).toEqual(initPosition)
        expect(this.targetPiece.position).toEqual(targetPosition)

        expect(board.at(initPosition).avatar.toSingle).toBe(this.initPiece.toSingle)
        expect(board.at(targetPosition).avatar.toSingle).toBe(this.targetPiece.toSingle)
      })
    })

    describe('after a move', () => {
      var initPosition = { x: 0, y: 0 }
      var targetPosition = { x: 0, y: 2 }
      var eaten
      beforeEach(function() {
        this.initPiece = board.at(initPosition).piece
        eaten = board.movePiece(this.initPiece, targetPosition)
      })

      it('moves the piece back to its original position', function() {
        board.backPiece(this.initPiece, this.targetPiece, { x: 0, y: 0 })
        expect(this.initPiece.position).toEqual(initPosition)

        expect(board.at(initPosition).avatar.toSingle).toBe(this.initPiece.toSingle)
        expect(board.at(targetPosition).avatar).toBe(null)
      })
    })
  })

  describe('#allPossibleMoves', () => {
    let emptyBoard
    beforeEach(() => {
      emptyBoard = Board.read([
        'C . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',
        '. . . . . . . . . .',  // [1, x]
        '. . . . . . . . . .',  // [0, x]
      ])
    })

    it('has the structure { avatar, move }', () => {
      expect(Object.keys(emptyBoard.allPossibleMoves(false)[0])).toContain('avatar', 'move')
    })

    it('should have 17 moves', () => {
      expect(emptyBoard.allPossibleMoves(false).length).toBe(17)
    })

    it('normal board should have 44 moves', () => {
      // R 4
      // K 4
      // M 4
      // G 2
      // B 1
      // C 22
      // P 5
      const optimize = false
      expect(board.allPossibleMoves(true, { optimize }).length).toBe(44)
      expect(board.allPossibleMoves(false, { optimize }).length).toBe(44)
    })

    describe('optimization', () => {
      beforeEach(() => {
        board = Board.read([
          'R . . P . . p . . r',
          'K . C . . . . . . k',
          'M . . P . . p . . m',
          'G . . . . . . . . g',
          'B . . P . c p . . b',
          'G . . . . . . . . g',
          'M . . P . . p . . m',
          'K . C . . . . c . k',  // [1, x]
          'R . . P . . p . . r',  // [0, x]
        ])
      })

      it('have less moves to consider when there are more pieces', () => {
        // pawn, minister, guard, general
        expect(board.allPossibleMoves(true).length).toBe(44-12)
      })

      describe('isBeingChecked', () => {
        it('will consider defensive moves if other player is checking', () => {
          expect(board.allPossibleMoves(true, { depth: 4, isBeingChecked: true }).length).toBe(44-5)
        })
      })
    })
  })

  describe('get #checkForVictory', () => {
    it('initially has no winner returns `x`', () => {
      expect(board.checkForVictory).toBe('x')
    })

    it('returns red/black if the opponents general is killed', () => {
      board.pieces.find(
        p => p.faction === 'red' && p.constructor.name === 'General'
      ).died()
      expect(board.checkForVictory).toBe('black')
    })
  })
})
