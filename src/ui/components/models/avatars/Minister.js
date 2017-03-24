import Avatar from './Avatar'
import FieldFormation from '../movesets/FieldFormation'

export default class Minister extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new FieldFormation(this);
    this.killMoveset = new FieldFormation(this);
  }

  get belongsToTopFaction() {
    return this.faction === 'red';
  }

}