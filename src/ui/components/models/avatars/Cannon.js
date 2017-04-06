import Avatar from './Avatar'
import Straight from '../movesets/Straight'
import Bombard from '../movesets/Bombard'

export default class Cannon extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new Straight(this);
    this.killMoveset = new Bombard(this);
  }

  get constructorName() { return 'Cannon' }
}
