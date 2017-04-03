import Moveset from './Moveset';
import matrix from '..//coordinateMatrix';
import tools from 'surgeonkit';

export default class Straight extends Moveset {
  constructor (avatar) {
    super(avatar);
  }

  get getPotentialOptions() {
    return {
      colOptions: matrix.col(this.currentX),
      rowOptions: matrix.row(this.currentY)
    }
  }

  get getMoveOptions() {
    let {colOptions, rowOptions} = this.getPotentialOptions;

    // filter out blockades and return result
    rowOptions = this._eliminateBeyondEncounterHorizontal(rowOptions)
    colOptions = this._eliminateBeyondEncounterVertical(colOptions)

    return [...colOptions, ...rowOptions];
  }

  _eliminateBeyondEncounterVertical(colOptions) {
    let dissection = tools.dissect(colOptions, this.currentY, this.currentY + 1);
    let top = dissection[0].reverse();
    let bottom = dissection[2];

    top = this._untilEncounterAvatar(top)
    bottom = this._untilEncounterAvatar(bottom)

    return [...top, ...bottom];
  }

  _eliminateBeyondEncounterHorizontal(rowOptions) {
    let dissection = tools.dissect(rowOptions, this.currentX, this.currentX + 1);
    let left = dissection[0].reverse();
    let right = dissection[2];

    left = this._untilEncounterAvatar(left)
    right = this._untilEncounterAvatar(right)

    return [...left, ...right];
  }

  /**
   * Return all coordinate until encounter a coordinate with an avatar.
   * @param  {array} coordinates - a list of coordinates
   * @return {array}             - coordinates before ecnountering avatar
   */
  _untilEncounterAvatar(coordinates) {
    return tools.acceptUntil(coordinates, function (coord) {
      return coord.avatar;
    })
  }
}
