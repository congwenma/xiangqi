let info = {
  red: {
    // converting to zhuanti missing unicode for these two
    // Chariot:  '车',
    // Knight:   '马',
    Chariot:  '車',
    Knight:   '馬',
    Minister: '相',
    Guard:    '士',
    General:  '帥',
    Cannon:   '炮',
    Pawn:     '兵'
  },
  black: {
    Chariot:  '車',
    Knight:   '馬',
    Minister: '象',
    Guard:    '仕',
    General:  '將',
    Cannon:   '炮',
    Pawn:     '卒'
  },
  pictographs: {
    red: {
      Chariot: 'images/avatars/red_chariot.svg',
      Knight: 'images/avatars/red_horse.svg',
      Minister: 'images/avatars/red_elephant.svg',
      Guard: 'images/avatars/red_advisor.svg',
      General: 'images/avatars/red_king.svg',
      Cannon: 'images/avatars/red_cannon.svg',
      Pawn: 'images/avatars/red_pawn.svg'
    },
    black: {
      Chariot: 'images/avatars/black_chariot.svg',
      Knight: 'images/avatars/black_horse.svg',
      Minister: 'images/avatars/black_elephant.svg',
      Guard: 'images/avatars/black_advisor.svg',
      General: 'images/avatars/black_king.svg',
      Cannon: 'images/avatars/black_cannon.svg',
      Pawn: 'images/avatars/black_pawn.svg'
    }
  },
  // TODO: replace this with single
  initials: {
    Chariot:  'C',
    Knight:   'K',
    Minister: 'M',
    Guard:    'D',
    General:  'G',
    Cannon:   'A',
    Pawn:     'P'
  },

  single: {
    Chariot:  'R',
    Knight:   'K',
    Minister: 'M',
    Guard:    'G',
    General:  'B',
    Cannon:   'C',
    Pawn:     'P'
  }
};

// var redSvgs = info.pictographs.red;
// for (var name in redSvgs) {
//   require(redSvgs[name])
// }

// var blackSvgs = info.pictographs.black;
// for (var name in blackSvgs) {
//   require(blackSvgs[name])
// }

export default info;
