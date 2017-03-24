import Avatar from './Avatar'
import CrossGuard from '../movesets/CrossGuard'

export default class Guard extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new CrossGuard(this);
    this.killMoveset = new CrossGuard(this);
  }

  get belongsToTopFaction() {
    return this.faction === 'red';
  }
}