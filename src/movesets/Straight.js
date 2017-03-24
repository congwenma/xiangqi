import tools from 'surgeonkit';

export function getPotentialOptions(board, { x, y }) {
  return {
    colOptions: board.col(x),
    rowOptions: board.row(y)
  }
}

function getMoveOptions(board, position) {
  const { x, y } = position
  let {colOptions, rowOptions} = getPotentialOptions(board, position)

  // filter out blockades and return result
  rowOptions = eliminateUntilEncounterHorizontal(rowOptions, x)
  colOptions = eliminateUntilEncounterVertical(colOptions, y)

  return [...colOptions, ...rowOptions];
}

function eliminateUntilEncounterVertical(colOptions, y) {
  let dissection = tools.dissect(colOptions, y, y+1);
  let top = dissection[0].reverse();
  let bottom = dissection[2];

  top = untilEncounterAvatar(top)
  bottom = untilEncounterAvatar(bottom)

  return [...top, ...bottom];
}

function eliminateUntilEncounterHorizontal(rowOptions, x) {
  let dissection = tools.dissect(rowOptions, x, x+1);
  let left = dissection[0].reverse();
  let right = dissection[2];

  left = untilEncounterAvatar(left)
  right = untilEncounterAvatar(right)

  return [...left, ...right];
}

/**
 * Return all coordinate until encounter a coordinate with an avatar.
 * @param  {array} coordinates - a list of coordinates
 * @return {array}             - coordinates before ecnountering avatar
 */
function untilEncounterAvatar(coordinates) {
  return tools.acceptUntil(coordinates, coord => coord.piece)
}


export default function(avatar) {
  const { board, position } = avatar

  return getMoveOptions(board, position)
}
