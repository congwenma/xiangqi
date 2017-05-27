// ui 
import config from '../../../config/chessConfig'
import matrix from '../coordinateMatrix'
import tools from 'surgeonkit';
import avatarsInfo from './avatarsInfo'

var {spacing} = config;

class Avatar {
  constructor ({faction, coordinate, player} = {}) {
    this.faction = faction;

    this.coordinate = coordinate;
    this.coordinate.setAvatar = this;

    this.player = player;

    this.moveset = null; // only one moveset for each piece in Chess
    this.killMoveset = null; // only one killMoveset for each piece
    this.name = this.constructor.name;
  }

  static get avatarsInfo() { return avatarsInfo }

  get getName() {
    return avatarsInfo[this.faction][this.constructorName]
  }

  get toSingle() {
    var name = avatarsInfo.single[this.constructorName]
    return this.faction === 'red' ? name.toLowerCase() : name
  }

  get getPictograph() {
    return avatarsInfo.pictographs[this.faction][this.constructorName]
  }

  unselect() {
    matrix.extinguish();
    this.player.selectedAvatar = null;
    this.player.opponent.avatars
      .filter(avatar => avatar.isHaloed())
      .map(avatar => avatar.active());
  }

  get location() {
    return {
      cx: spacing * this.coordinate.xPoint,
      cy: spacing * this.coordinate.yPoint
    }
  }

  get getMoveOptions() {
    return this.moveset.getMoveOptions;
  }

  get getKillOptions() {
    return this.killMoveset.getKillOptions;
  }


  set setCoordinate(coord) {
    // footprint
    matrix.clearFootprint(this.player.faction)
    this.coordinate.footprintColor = this.player.faction
    coord.footprintColor = this.player.faction

    this.coordinate.setAvatar = null;
    this.coordinate = coord;
    coord.setAvatar = this;
  }

  moveTo(coord) {
    if ( this.getMoveOptions.indexOf(coord) === -1) {
      throw new Error(`coordinate not found, cant move to this location, ${coord}`);
    }
    
    this.setCoordinate = coord;
    this.unselect();
  }

  killOn(coord) {
    if (this.getKillOptions.indexOf(coord) === -1) {
      throw new Error(`cannot make kill on this coord: ${coord.show}`);
    }
    else if (coord.avatar === null) {
      throw new Error(`No unit on this coord to kill: ${coord.show}`);
    }

    coord.avatar.deceased(function postMortem() {
      coord.setAvatar = null;
    });
    this.setCoordinate = coord;
    this.unselect();
  }

  kill(avatar2) {
    this.killOn(avatar2.coordinate);
  }
}

tools.defineState(Avatar, ['active', 'deceased', 'haloed'])



export default Avatar;
