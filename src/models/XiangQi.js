// import SearchModel from '../algorithm/SearchModel'
import Board from './Board'
//import Board from './Board_es5'

export default class XiangQi {
  constructor({ board } = {}) {
    //this.player = 'red' // ignoring this facet of this class
    this.board = board ? Board.read(board) : new Board
  }

  // takes current board and view and makes a move
  get_response_move() {

    // TODO: grabs the result and return it
    //return result;
  }

  computer_move() {

  }

  user_move() {
    // user movement
  }

  switchTurn() {  // @returns null
    //this.player = this.player === 'red' ? 'black' : 'red'
  }
}
