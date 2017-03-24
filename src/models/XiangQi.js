import SearchModel from '../algorithm/SearchModel'
import Board from './Board'

export default class GameController {
  constructor() {
    this.player = 'red'
    this.board = new Board
  }

  // takes current board and view and makes a move
  get_response_move() {

    // TODO: grabs the result and return it
    return result;
  }

  computer_move() {

  }

  user_move() {
    // user movement
  }

  switchTurn() {  // @returns null
    this.player = this.player === 'red' ? 'black' : 'red'
  }
}
