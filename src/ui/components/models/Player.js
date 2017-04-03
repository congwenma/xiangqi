import matrix from './coordinateMatrix';

export default class Player {
  constructor({faction, opponent} = {}) {
    this.faction = faction;
    this.avatars = [];
    this.selectedAvatar = null;

    this.setOpponent = opponent;
  }

  set addAvatar(avatar) {
    this.avatars.push(avatar);
    avatar.player = this;
  }

  set setOpponent(opponent) {
    if (opponent) {
      this.opponent = opponent;
      opponent.opponent = this;
    }
  }

  set addAvatars(allPieces) {
    allPieces.forEach((avatar) => {
      this.addAvatar(avatar)
    })
  }

  set setSelectedAvatar(avatar) {
    matrix.extinguish();
    this.opponent.avatars.filter(avatar=>avatar.isHaloed()).map(avatar => avatar.active());

    if (avatar === null) {
      this.selectedAvatar = avatar;
    }
    else if (this.selectedAvatar === avatar) {
      this.selectedAvatar = null;
    }
    else if (this.avatars.indexOf(avatar) !== -1) {
      this.selectedAvatar = avatar;
      
      this.selectedAvatar.getMoveOptions.map((coord) => {
        coord[`${this.faction}Highlighted`]();
      });

      this.selectedAvatar.getKillOptions.map((coord) => {
        coord.avatar.haloed();
      })
    }
  }

  get getSelectedAvatar() { return this.selectedAvatar }

}