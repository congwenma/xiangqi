// KILL THIS, use AlphaBetaPrune as the new search model
class NodeBenchmarker {
  constructor() { this.start = process.hrtime() }
  end() {
    this.diff = process.hrtime(this.start)
    return this.result
  }
  get result() {
    return `took ${this.diff[0]}.${this.diff[1]}`
  }
}

class BrowserBenchmarker {
  constructor() { this.start = performance.now() }
  end() {
    this.end = performance.now()
    return this.result
  }
  get calcSeconds() { return (this.end - this.start) / 1000 }
  get result() {
    return `took ${this.calcSeconds} secs.`
  }
}

import EvalModel from './EvalModel'

export default class SearchModel {
  constructor({ game }) {
    this.game = game
    this.evalModel = new EvalModel
  }

  search(board) {
    this.board = board
    var depth = 2
    if (board.pieces.length < 28)
      depth = 3
    if (board.pieces.length < 16)
      depth = 4
    if (board.pieces.length < 6)
      depth = 5
    if (board.pieces.length < 4)
      depth = 6

    var benchmarker = new BrowserBenchmarker
    let best = null // will be a move

    let moves = board.allPossibleMoves(true)  // generate all moves for one player
    for (let move of moves) {
      var eaten = board.movePiece(move.avatar, move.position)
      move.value = this.alphaBeta(depth, MIN, MAX, false) // value the current move

      // Select a best move during searching
      if (best === null || move.value > best.value) {
        best = move
      }

      /* Back move*/
      // move the current piece back to where its from
      // if opponent piece was eaten, revive it.
      board.backPiece(move.avatar, eaten, move.from)
    }

    benchmarker.end()

    return best
  }

  alphaBeta(depth, min, max, isMax) {
    const { board } = this.game

    // return evaluation if reaching leaf node or any side won
    if (depth == 0 || this.game.checkForVictory !== 'x') {
      return this.evalModel.eval(board, 'black')
    }

    let moves = board.allPossibleMOves(isMax)
    for (let move of moves) {
      var eaten = board.movePiece(move.avatar, move.position)

      if (isMax) { // black
        // get maximum of: alpha, alphaBeta(depth -1, alpha, beta, false)
      } else { // red
        // get minimum of: beta, alphaBeta(depth -1, alpha, beta, true)
      }

      // Back move
      board.backPiece(move.avatar, eaten, move.position)

      // Prune
      if (beta <= alpha) { break }
    }
    return isMax ? alpha : beta
  }
}
