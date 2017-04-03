import Moveset from './Moveset';
import matrix from '../coordinateMatrix';

export default class SunFormation extends Moveset {
  constructor(avatar) {
    super(avatar)
  }

  get getPotentialOptions() {

    var rightOptions = [
      matrix.coord(this.x+2, this.y+1),
      matrix.coord(this.x+2, this.y-1),
    ].filter(()=> {
      let trippingStone = matrix.coord(this.x+1, this.y);
      return trippingStone && !trippingStone.avatar;
    });

    var leftOptions = [
      matrix.coord(this.x-2, this.y+1),
      matrix.coord(this.x-2, this.y-1),
    ].filter(()=> {
      let trippingStone = matrix.coord(this.x-1, this.y);
      return trippingStone && !trippingStone.avatar;
    });

    var bottomOptions = [
      matrix.coord(this.x+1, this.y+2),
      matrix.coord(this.x-1, this.y+2),
    ].filter(()=> {
      let trippingStone = matrix.coord(this.x, this.y+1);
      return trippingStone && !trippingStone.avatar;
    });

    var topOptions = [
      matrix.coord(this.x+1, this.y-2),
      matrix.coord(this.x-1, this.y-2),
    ].filter(()=> {
      let trippingStone = matrix.coord(this.x, this.y-1);
      return trippingStone && !trippingStone.avatar;
    });

    return [...rightOptions, ...leftOptions, ...topOptions, ...bottomOptions]
  }

  get getMoveOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    // remove coords outside of matrix and those with an avatar in it
    let options = this.getPotentialOptions.filter((opt) => {
      return !!opt && !opt.avatar;
    });

    return options;
  }

  get getKillOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    // remove coords outside of matrix and those with an avatar in it
    let options = this.getPotentialOptions.filter((opt) => {
      return !!opt && opt.avatar && opt.avatar.player !== this.avatar.player;
    });

    return options;
  }

}
