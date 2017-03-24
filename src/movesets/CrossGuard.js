import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'

function getCornerOptions (board, faction) {
  if (faction === 'black') {
    return [
      board[3][0],
      board[5][0],
      board[3][2],
      board[5][2],
    ]
  } else {
    return [
      board[3][9],
      board[5][9],
      board[3][7],
      board[5][7],
    ]
  }
}

function getCenterOption(board, faction) {
  if (faction === 'black') {
    return [board[4][1]]
  } else {
    return [board[4][8]]
  }
}

function getPotentialOptions(board, position, faction) {
  if (position.x === 4) {
    return getCornerOptions(board, faction)
  }
  else {
    return getCenterOption(board, faction)
  }
}

function getMoveOptions(...args) {
  return getPotentialOptions(...args).filter(withNoAvatar);
}

function getKillOptions(...args) {
  const [_1, _2, faction] = args
  return getPotentialOptions(...args).filter(hasAvatarEnemyOf(faction))
}


export default function CrossGuard(avatar) {
  const { board, faction, position } = avatar

  return getMoveOptions(board, position, faction)
}

export function CrossKill(avatar) {
  const { board, faction, position } = avatar

  return getKillOptions(board, position, faction)
}
