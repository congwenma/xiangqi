import tools from 'surgeonkit';
import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'
import { General } from '../../src/models/Avatar'

function getPotentialOptions(board, position, faction) {
  const { x, y } = position
  let restriction = faction === 'black' ?
    {x: [3,4,5], y: [0,1,2]} :
    {x: [3,4,5], y: [7,8,9]}

  return [
    board.at({ x: x, y: y+1 }),
    board.at({ x: x, y: y-1 }),
    board.at({ x: x+1, y: y }),
    board.at({ x: x-1, y: y }),
  ].filter(coord => {
    return !!coord && restriction.x.indexOf(coord.xPoint) !== -1 && restriction.y.indexOf(coord.yPoint) !== -1;
  }).filter(filterFaceToFace(board, faction));
}

function getMoveOptions(...args) {
  return getPotentialOptions(...args).filter(withNoAvatar);
}

function getKillOptions(...args) {
  const [_1, _2, faction] = args
  return getPotentialOptions(...args).filter(hasAvatarEnemyOf(faction))//.concat(this.getFlyingGeneralOption)
}

// function getFlyingGeneralOption() {
//   let col = matrix.col(this.x);
//   let dissection = tools.dissect(col, this.currentY, this.currentY + 1);
//   let top = dissection[0].reverse();
//   let bottom = dissection[2];
//
//   if (this.avatar.belongsToTopFaction) {
//     return bottom.filter((coord)=> {
//       return coord.avatar;
//     }).slice(0, 1).filter(function (coord) {
//       return coord.avatar instanceof General;
//     });
//   }
//   else {
//     return top.filter((coord)=> {
//       return coord.avatar;
//     }).slice(0, 1).filter(function (coord) {
//       return coord.avatar instanceof General;
//     });
//   }
// }

/* Prevents a Flying general from ever taking place*/
function filterFaceToFace(board, faction) {
  return function (option) {
    const { x, y } = option
    let col = board.col(x);
    let dissection = tools.dissect(col, y, y + 1);
    let topPieces = dissection[0].reverse();
    let bottomPieces = dissection[2];

    var candidates = faction === 'black' ? bottomPieces : topPieces;
    var nextPiece = candidates.find(coord => coord.avatar);
    return !(nextPiece && (nextPiece.avatar instanceof General &&
      nextPiece.avatar.faction !== faction));
  }
}

export default function Proximity(avatar) {
  const { board, faction, position } = avatar

  return getMoveOptions(board, position, faction)
}

export function ProximityKill(avatar) {
  const { board, faction, position } = avatar

  return [
    ...getKillOptions(board, position, faction),
    ...FlyingGeneral(avatar)
  ]
}

export function FlyingGeneral(avatar) {
  const { board, faction, position, position: { x, y } } = avatar

  let col = board.col(x);
  let dissection = tools.dissect(col, y, y+1);
  let top = dissection[0].reverse();
  let bottom = dissection[2];

  if (faction === 'black') {
    return bottom.filter((coord)=> {
      return coord.avatar;
    }).slice(0, 1).filter(function (coord) {
      return coord.avatar instanceof General;
    });
  }
  else {
    return top.filter((coord)=> {
      return coord.avatar;
    }).slice(0, 1).filter(function (coord) {
      return coord.avatar instanceof General;
    });
  }
}
