import Straight from './Straight';
import tools from 'surgeonkit';

export default class StraightKill extends Straight {
  constructor(avatar) {
    super(avatar);
  }  

  get getKillOptions() {
    let {colOptions, rowOptions} = super.getPotentialOptions; // explicit about where to look, although this.getPotentialOptions would be sufficient.
    rowOptions = this._findFirstEncounterHorizontal(rowOptions);
    colOptions = this._findFirstEncounterVertical(colOptions);
    return [...rowOptions, ...colOptions].filter((coord)=> {
      return this.avatar.player !== coord.avatar.player;
    });
  }

  _findFirstEncounterHorizontal(rowOptions) {
    let dissection = tools.dissect(rowOptions, this.currentX, this.currentX + 1);
    let left = dissection[0].reverse();
    let right = dissection[2];

    left = this._findFirstEncounter(left);
    right = this._findFirstEncounter(right);

    return [...left, ...right];
  }

  _findFirstEncounterVertical(colOptions) {
    let dissection = tools.dissect(colOptions, this.currentY, this.currentY + 1);
    let top = dissection[0].reverse();
    let bottom = dissection[2];

    top = this._findFirstEncounter(top);
    bottom = this._findFirstEncounter(bottom);

    return [...top, ...bottom];
  }

  _findFirstEncounter(coordinates) {
    return coordinates.filter((coord)=> {
      return coord.avatar;
    }).slice(0, 1); // only returning [result1] or []
  }
}