import Player from './Player';
import Grid from '../landscapes/Grid';
import Coordinate from './Coordinate';

import generatePieces from './generatePieces';
import coordinateMatrix from './coordinateMatrix';

import GameStat from './GameStat';

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
    this.mainView.forceUpdate();
    return this.activePlayer;
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
      throw new Error('Cannot kill a unit outside of kill options');
    }
  }

  issueKill(avatar1, avatar2) {
    avatar1.kill(avatar2);
    this.activePlayer.setSelectedAvatar = null;
    this.endGameCondition();
    this.switchTurn();
  }

  selectMove(coord) {
    if (coord.isHidden()) {
      throw new Error('coord is not highlighted, unable to move');
    }
    this.activePlayer.getSelectedAvatar.moveTo(coord);
    this.switchTurn();
  }

  endGameCondition() {
    var isGameOverConfirmed = true;
    if (this.player1.general.isDeceased()) {
      isGameOverConfirmed = alert('player 2 wins');
    }
    else if (this.player2.general.isDeceased()) {
      isGameOverConfirmed = alert('player 1 wins');
    }
    if(!isGameOverConfirmed) {
      this.reset();
    }
  }

  reset () {
    this.getAvatars.map((avatar) => {
      avatar.coordinate.avatar = null;
      avatar.coordinate = null;
    });

    this.player1.avatars = [];
    this.player2.avatars = [];

    this.start();
    this.mainView.forceUpdate();
    this.stat.resetClock();
  }
}
