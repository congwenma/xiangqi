export default class MoveSet {
  constructor (avatar) {
    this.avatar = avatar;
  } 

  get currentX () {
    return this.avatar.coordinate.xPoint;
  }  

  get currentY () {
    return this.avatar.coordinate.yPoint;
  }
}