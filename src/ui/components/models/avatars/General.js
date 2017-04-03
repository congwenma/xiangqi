import Avatar from './Avatar'
import Proximity from '../movesets/Proximity'

export default class General extends Avatar {
  constructor (params) {
    super(params)
    params.player.general = this;
    this.moveset = new Proximity(this);
    this.killMoveset = new Proximity(this);
  }

  get belongsToTopFaction() {
    return this.faction === 'black';
  }
}
