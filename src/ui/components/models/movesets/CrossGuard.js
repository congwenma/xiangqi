import Moveset from './Moveset';
import matrix from '../coordinateMatrix';

export default class CrossGuard extends Moveset {
  constructor(avatar) {
    super(avatar)
  }

  get getCornerOptions () {
    if (this.avatar.belongsToTopFaction) {
      return [
        matrix.coord(3, 0),
        matrix.coord(5, 0),
        matrix.coord(3, 2),
        matrix.coord(5, 2),
      ]
    } else {
      return [
        matrix.coord(3, 9),
        matrix.coord(5, 9),
        matrix.coord(3, 7),
        matrix.coord(5, 7),
      ]
    }
  }

  get getCenterOption() {
    if (this.avatar.belongsToTopFaction) {
      return [matrix.coord(4, 1)]
    } else {
      return [matrix.coord(4, 8)]
    }
  }

  get getPotentialOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    if (this.x === 4) {
      return this.getCornerOptions;
    }
    else {
      return this.getCenterOption;
    }
  }

  get getMoveOptions() {
    return this.getPotentialOptions.filter((coord)=> {
      return !coord.avatar;
    });
  }

  get getKillOptions() {
    return this.getPotentialOptions.filter((coord)=> {
      return coord.avatar && coord.avatar.player !== this.avatar.player
    })
  }
}
