import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'

function getPotentialOptions(board, position, faction, hasCrossedRiver) {
  const { x, y } = position

  let marchOption = board.at({ x, y: faction === 'black' ? y+1 : y-1 })

  return [
    ...(
      hasCrossedRiver ? [
        board.at({ x: x+1, y }),
        board.at({ x: x-1, y })
      ] : []
    ),
    marchOption
  ].filter(identity);
}

function getMoveOptions(...args) {
  return getPotentialOptions(...args).filter(withNoAvatar);
}

function getKillOptions(...args) {
  const [_1, _2, faction] = args
  return getPotentialOptions(...args).filter(hasAvatarEnemyOf(faction));
}



export default function March(avatar) {
  const { board, faction, hasCrossedRiver, position } = avatar

  return getMoveOptions(board, position, faction, hasCrossedRiver)
}


export function MarchKill(avatar) {
  const { board, faction, hasCrossedRiver, position } = avatar

  return getKillOptions(board, position, faction, hasCrossedRiver)
}
