import { AvatarInvertDictionary } from '../models/Avatar'

export const hashSum = obj => {
  return Object.entries(obj).reduce(
    (sum, [_, value]) => sum + value, 0
  )
}

export default class EvalModel {
  constructor() {

  }

  /**
   * Evaluates current state of play to determine a score
   * @param board <Board> - stajte of board
   * @param faction <String> - 'red' or 'black', evaluate in his/her perspective
   * @return <Integer> - value of current board
   */
  eval(board, faction) {
    var values = {
      red: { base: 0, position: 0 },
      black: { base: 0, position: 0 }
    }

    var evalModel = this;
    board.pieces.filter(p => p.isAlive).forEach(piece => {
      const { faction, toSingle } = piece
      values[faction].base += piece.baseValue
      values[faction].position += piece.positionValue
    })

    let sumRed = hashSum(values.red)
    let sumBlack = hashSum(values.black)
    switch(faction) {
      case 'red':
        return sumRed - sumBlack
      case 'black':
        return sumBlack - sumRed
      default:
        return -1
    }
  }

  // Unimplemented
  controlValue(piece) { return 0 } // ?
  protectValue(piece) { return 0 }
  flexibleValue(piece) { return 0 }
  featureValue(piece) { return 0 } // ?
}
