import Avatar from './Avatar'
import SunFormation from '../movesets/SunFormation'

export default class Knight extends Avatar {
  constructor (params) {
    super(params)
    this.moveset = new SunFormation(this);
    this.killMoveset = new SunFormation(this);
  }

  get constructorName() { return 'Knight' }
}
