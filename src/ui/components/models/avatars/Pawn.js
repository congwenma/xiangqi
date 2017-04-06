import Avatar from './Avatar'
import March from '../movesets/March'

export default class Pawn extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new March(this);
    this.killMoveset = new March(this);
  }

  get hasCrossedRiver() {
    if(this.isTopFaction) {
      return this.coordinate.yPoint > 4;
    }
    else {
      return this.coordinate.yPoint < 5;
    }
  }

  get isTopFaction() {
    return this.faction === 'black';
  }

  get constructorName() { return 'Pawn' }
}
