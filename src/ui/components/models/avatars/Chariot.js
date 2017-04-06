import Avatar from './Avatar'
import Straight from '../movesets/Straight'
import StraightKill from '../movesets/StraightKill'

export default class Chariot extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new Straight(this);
    this.killMoveset = new StraightKill(this);
  }

  get constructorName() { return 'Chariot' }
}
