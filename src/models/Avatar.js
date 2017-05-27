// ai
import { AvatarBaseValues, AvatarPositionValues } from '../algorithm/AvatarValues'

// Individual avatars movesets
import Straight from '../movesets/Straight'
import StraightKill from '../movesets/StraightKill'
import Bombard from '../movesets/Bombard'
import Proximity, { ProximityKill } from '../movesets/Proximity'
import CrossGuard, { CrossKill } from '../movesets/CrossGuard'
import SunFormation, { SunKillFormation } from '../movesets/SunFormation'
import FieldFormation, { FieldKillFormation } from '../movesets/FieldFormation'
import March, { MarchKill } from '../movesets/March'

export default class Avatar {
  constructor ({faction, position, index} = {}) {
    this.faction = faction // red or black
    this.position = position
    this.index = index // what is this for?
  }

  get moves() { return [...this.killOptions, ...this.moveOptions].map(move => ({ avatar: this, move }))}

  // smart getters
  get name() { return AvatarConstructorDictionary.get(this.constructor) }
  // get position() { return this.coord ? this.coord.xy : {}}
  get coord() {
    const { x, y } = this.position
    return this.board[x][y]
  }

  get toSingle() {
    const char = AvatarInvertDictionary.get(this.constructor)
    return this.isRed ? char.toLowerCase() : char;
  }

  died() { this.position = { x: -1, y: -1 } }
  get isAlive() {
    const { x, y } = this.position
    return x !== -1 && y !== -1
  }
  get isRed() { return this.faction === 'red' }

  get key() { return this.toString() }

  moveTo(position) {
    const { x: toX, y: toY } = position
    if (!this.moveOptions.map(move => move.xy).find(({x, y}) =>  x === toX && y === toY )) {
      throw new Error('Cannot make an illegal move')
    }
    this.coord.piece = null
    this.placeOn(position)
  }

  placeOn(position) {
    this.position = position
    this.coord.piece = this
  }

  /**
   * Static Evaluation, uses a dictionary to find the value of piece
   * TODO: convert piece informationt to a hash
   * @return <Integer> - a value
   */
  get baseValue() { return AvatarBaseValues[this.toSingle] }
  get positionValue() {
    const { toSingle, position: { x, y } } = this
    return AvatarPositionValues[toSingle][x][y] * 8 // weight different
  }

  // NOTE: useless
  // invert() {
  //   const { faction, position, index } = this
  //   return new this.constructor({
  //     position, index,
  //     faction: faction === 'red' ? 'black' : 'red'
  //   })
  // }
}

export class Cannon extends Avatar {
  constructor (params) { super(params) }

  get moveOptions() { return Straight(this) }
  get killOptions() { return Bombard(this) }
}

export class Chariot extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return Straight(this) }
  get killOptions() { return StraightKill(this) }
}
export class General extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return Proximity(this) }
  get killOptions() { return ProximityKill(this) }
}
export class Guard extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return CrossGuard(this) }
  get killOptions() { return CrossKill(this) }
}
export class Knight extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return SunFormation(this)}
  get killOptions() { return SunKillFormation(this)}
}
export class Minister extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return FieldFormation(this) }
  get killOptions() { return FieldKillFormation(this) }
}
export class Pawn extends Avatar {
  constructor (params) { super(params) }
  get moveOptions() { return March(this) }
  get killOptions() { return MarchKill(this) }
  get hasCrossedRiver() {
    if(this.faction === 'black') {
      return this.position.y > 4;
    }
    else {
      return this.position.y < 5;
    }
  }
}

// look up constructor's name when file has been minified, and consturctor
// names have been mutated
export const AvatarConstructorDictionary = new Map([
  [General, 'General'], // as in boss, lol!
  [Chariot, 'Chariot'], // as in rook
  [Cannon, 'Cannon'],
  [Knight, 'Knight'],
  [Minister, 'Minister'],
  [Guard, 'Guard'],
  [Pawn, 'Pawn'],
])

export const AvatarDictionary = new Map([
  ['B', General], // as in boss, lol!
  ['R', Chariot], // as in rook
  ['C', Cannon],
  ['K', Knight],
  ['M', Minister],
  ['G', Guard],
  ['P', Pawn],
])

// rename to something more descriptive
export const AvatarInvertDictionary = new Map(
  Array.from(AvatarDictionary).map(pair => pair.reverse())
)
