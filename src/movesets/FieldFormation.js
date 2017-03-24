import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'

const isValidDestination = ({ destination, obstacle }) => destination && !obstacle.avatar

function getPotentialOptions(board, { x, y }, faction) {
  var upperRight = { destination: board.at({ x: x+2, y: y-2 }), obstacle: board.at({ x: x+1, y: y-1 }) }
  var upperLeft  = { destination: board.at({ x: x-2, y: y-2 }), obstacle: board.at({ x: x-1, y: y-1 }) }
  var bottomRight = { destination: board.at({ x: x+2, y: y+2 }), obstacle: board.at({ x: x+1, y: y+1 }) }
  var bottomLeft  = { destination: board.at({ x: x-2, y: y+2 }), obstacle: board.at({ x: x-1, y: y+1 }) }

  return [upperRight, upperLeft, bottomRight, bottomLeft]
    .filter(isValidDestination)
    .map(pair => pair.destination)

    // exist in board and is behind frontier
    .filter(coord => faction === 'black' ? coord.y <= 4 : coord.y >= 5)
}

function getMoveOptions(...args) {
  // remove coords outside of matrix and those with an avatar in it
  return getPotentialOptions(...args).filter(withNoAvatar);
}

function getKillOptions(...args) {
  const [_1, _2, faction] = args
  return getPotentialOptions(...args).filter(hasAvatarEnemyOf(faction))
}

export default function FieldFormation(avatar) {
  const { board, faction, position } = avatar

  return getMoveOptions(board, position, faction)
}


export function FieldKillFormation(avatar) {
  const { board, faction, position } = avatar

  return getKillOptions(board, position, faction)
}
