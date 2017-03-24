import Straight from './Straight';
import tools from 'surgeonkit';

export default class Bombard extends Straight {
  constructor(avatar) {
    super(avatar);
  }  

  get getKillOptions() {
    let {colOptions, rowOptions} = super.getPotentialOptions; // explicit about where to look, although this.getPotentialOptions would be sufficient.
    rowOptions = this._findSecondEncounterHorizontal(rowOptions);
    colOptions = this._findSecondEncounterVertical(colOptions);
    
    return [...rowOptions, ...colOptions].filter((coord)=> {
      return this.avatar.player !== coord.avatar.player;
    });
  }

  _findSecondEncounterHorizontal(rowOptions) {
    let dissection = tools.dissect(rowOptions, this.currentX, this.currentX + 1);
    let left = dissection[0].reverse();
    let right = dissection[2];

    left = this._findSecondEncounter(left);
    right = this._findSecondEncounter(right);

    return [...left, ...right];
  }

  _findSecondEncounterVertical(colOptions) {
    let dissection = tools.dissect(colOptions, this.currentY, this.currentY + 1);
    let top = dissection[0].reverse();
    let bottom = dissection[2];

    top = this._findSecondEncounter(top);
    bottom = this._findSecondEncounter(bottom);

    return [...top, ...bottom];
  }

  _findSecondEncounter(coordinates) {
    return coordinates.filter((coord)=> {
      return coord.avatar;
    }).slice(1, 2); // only returning [second result] or []
  }
}