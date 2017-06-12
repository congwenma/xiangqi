import Player from './Player';
import Grid from '../landscapes/Grid';
import Coordinate from './Coordinate';

import generatePieces from './generatePieces';
import coordinateMatrix from './coordinateMatrix';

import GameStat from './GameStat';

import { XiangQiSearcher } from '../../../algorithm/AlphaBetaPruner'
// import Board from '../../../models/Board'
import Board from '../../../models/Board_es5'

export default class ChessGame{

  constructor (view) {
    this.stat = new GameStat(this);
    this.mainView = view;

    this.grid = new Grid;

    this.player1 = new Player({faction: 'red'});
    this.player2 = new Player({faction: 'black', opponent: this.player1});

    this.coordinates = coordinateMatrix;

    this.config = {svgAvatar: true };

    this.start();
  }

  start() {
    this.activePlayer = this.player1;
    this.player1.avatars = generatePieces.call(this, this.player1);
    this.player2.avatars = generatePieces.call(this, this.player2);
  }

  switchTurn() {
    if (this.activePlayer === this.player1) {
      this.activePlayer = this.player2;
    } else {
      this.activePlayer = this.player1;
    }
    this.mainView.forceUpdate(() => {
      if (this.activePlayer === this.player2){
        setTimeout(this.computerThink.bind(this))
      }
    });
    return this.activePlayer;
  }

  computerThink() {
    const { avatar, move } = new XiangQiSearcher({
      board: this.algorithmBoard
    }).compute().content

    // make the move, avatar -> move, // beautify this
    const { x, y } = avatar.position
    const correctAvatar = this.coordinates[x][y].avatar // correct as in in this.coordinates
    this.selectAvatar(correctAvatar)
    const { xPoint, yPoint } = move
    const correctMove = this.coordinates[xPoint][yPoint]
    if(correctMove.avatar) {
      this.issueKill(correctAvatar, correctMove.avatar)
    } else {
      this.selectMove(correctMove)
    }
  }

  get algorithmBoard () {
    return Board.read(
      this.coordinates.map(
        xCol => xCol.map(
          ({avatar}) => avatar ? avatar.toSingle : '.'
        ).join(' ')
      )
    )
  }

  get getAvatars() {
    return this.player1.avatars.concat(this.player2.avatars);
  }

  // Game Progression methods
  selectAvatar(avatar) {
    let {player} = avatar;

    if(this.activePlayer === avatar.player) {
      player.setSelectedAvatar = avatar;
    }
    else if (avatar.isHaloed()) {
      this.issueKill(this.activePlayer.selectedAvatar, avatar);
    }
    else {
      // do nothing when its time for you to wait
      // throw new Error('Cannot kill a unit outside of kill options');
    }
  }

  issueKill(avatar1, avatar2) {
    avatar1.kill(avatar2);
    this.activePlayer.setSelectedAvatar = null;
    this.mainView.forceUpdate()
    setTimeout(() => this.endGameCondition())
  }

  selectMove(coord) {
    if (coord.isHidden()) {
      return console.error('coord is not highlighted, unable to move');
    }
    this.activePlayer.getSelectedAvatar.moveTo(coord);
    this.switchTurn();
  }

  endGameCondition() {
    var isGameOverConfirmed = true;
    if (this.player1.general.isDeceased()) {
      window.dialog({
        mainText: "Player 2 wins",
        confirmCallback: () => this.reset()
      })
    }
    else if (this.player2.general.isDeceased()) {
      window.dialog({
        mainText: "Player 1 wins",
        confirmCallback: () => this.reset()
      })
    }
    else {
      this.switchTurn()
    }
  }

  reset () {
    this.getAvatars.map((avatar) => {
      avatar.coordinate.avatar = null;
      avatar.coordinate = null;
    });

    this.coordinates.clearAllFootprint()

    this.activePlayer = this.player1
    this.player1.avatars = [];
    this.player2.avatars = [];

    this.start();
    this.mainView.forceUpdate();
    this.stat.resetClock();
  }
}
