import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'

const removeTripped = (result, { destinations, trippingStone }) =>
  trippingStone && trippingStone.avatar
    ? result
    : result.concat(destinations)

function getPotentialOptions(board, position) {
  const { x, y } = position

  var rightOptions = {
    destinations: [
      board.at(x+2, y+1),
      board.at(x+2, y-1),
    ],
    trippingStone: board.at(x+1, y)
  }

  var leftOptions = {
    destinations: [
      board.at({ x: x-2, y: y+1 }),
      board.at({ x: x-2, y: y-1 }),
    ],
    trippingStone: board.at({ x: x-1, y: y })
  }

  var bottomOptions = {
    destinations: [
      board.at({ x: x+1, y: y+2 }),
      board.at({ x: x-1, y: y+2 }),
    ],
    trippingStone: board.at({ x: x, y: y+1 })
  }

  var topOptions = {
    destinations: [
      board.at({ x: x+1, y: y-2 }),
      board.at({ x: x-1, y: y-2 }),
    ],
    trippingStone: board.at({ x: x, y: y-1 })
  }

  return [rightOptions, leftOptions, topOptions, bottomOptions].reduce(removeTripped, [])
}

function getMoveOptions(board, position, faction) {
  // remove coords outside of matrix and those with an avatar in it
  return getPotentialOptions(board, position).filter(withNoAvatar);
}

function getKillOptions(board, position, faction) {

  // remove coords outside of matrix and those with an avatar in it
  return getPotentialOptions(board, position).filter(hasAvatarEnemyOf(faction))
}

export default function SunFormation(avatar) {
  const { board, faction, position } = avatar

  return getMoveOptions(board, position, faction)
}

export function SunKillFormation(avatar) {
  const { board, faction, position } = avatar

  return getKillOptions(board, position, faction)
}
