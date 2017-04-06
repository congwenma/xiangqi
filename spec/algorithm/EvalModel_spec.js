import EvalModel, { hashSum } from '../../src/algorithm/EvalModel'
import { Chariot, Guard } from '../../src/models/Avatar'
import Board from '../../src/models/Board'

describe('EvalModel', () => {
  var evalModel = new EvalModel
  var board = new Board

  describe('#evaluationMethods', () => {
    it('can evaluate a Offensive Piece(Chariot, Cannon...)', () => {
      var chariot = board[0][0].avatar

      expect(chariot.positionValue).toBe(-16)
      expect(board[0][9].avatar.positionValue).toBe(-16)
    })

    it('can evaluate a Defensive Piece(Guard, Minister...)', () => {
      var guard = board[3][0].avatar

      expect(guard.positionValue).toBe(-8)
    })
  })

  describe('#eval', () => {
    it('initially evaluate 0', () => {
      expect(evalModel.eval(board, 'red')).toBe(0)
    })

    describe('unit Killed in Action', () => {
      it('cause loss', () => {
        var blackCannon = board[1][2].avatar
        var redKnight = board[1][9].avatar
        var redChariot = board[0][9].avatar
        expect(evalModel.eval(board, 'black')).toBe(0)

        // Cannon kill Knight
        board.movePiece(blackCannon, redKnight.position)
        expect(evalModel.eval(board, 'black')).toBe(300)

        // Chariot kill Cannon
        board.movePiece(redChariot, blackCannon.position)

        // 12 for the moving out of  chariot
        // 4 for the bad position of knight's initial position, which was -4
        // 100 for the loss of cannon
        expect(evalModel.eval(board, 'black')).toBe(
          - ((12 + 4) * 8 + 100)
        )

        board = new Board //reset
      })
    })

    describe('unit move to advantage point', () => {
      it('causes boost', () => {
        expect(evalModel.eval(board, 'black')).toBe(0)
        board[0][0].avatar.placeOn({ x: 0, y: 1 })
        expect(evalModel.eval(board, 'black')).toBe(80)
        board[0][0].avatar.placeOn({ x: 0, y: 0 }) //reset
      })
    })
  })
})

describe('$hashSum', () => {
  it('should add up all values in object', () => {
    expect(hashSum({ a: 1, b: 2 })).toBe(3)
  })
})
