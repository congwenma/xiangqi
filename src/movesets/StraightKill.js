import Straight, { getPotentialOptions } from './Straight';
import { hasAvatarEnemyOf } from './util'
import tools from 'surgeonkit';

// only returning [result1] or []
const findFirstEncounter = coordinates =>
  coordinates.filter(coord => coord.avatar).slice(0, 1);

const getKillOptions = (board, position, faction) => {
  const { x, y } = position
  let {colOptions, rowOptions} = getPotentialOptions(board, position); // explicit about where to look, although this.getPotentialOptions would be sufficient.
  rowOptions = findFirstEncounterHorizontal(rowOptions, x);
  colOptions = findFirstEncounterVertical(colOptions, y);
  return [...rowOptions, ...colOptions].filter(hasAvatarEnemyOf(faction));
}

function findFirstEncounterHorizontal(rowOptions, x) {
  let dissection = tools.dissect(rowOptions, x, x + 1);
  let left = dissection[0].reverse();
  let right = dissection[2];

  left = findFirstEncounter(left);
  right = findFirstEncounter(right);

  return [...left, ...right];
}

function findFirstEncounterVertical(colOptions, y) {
  let dissection = tools.dissect(colOptions, y, y + 1);
  let top = dissection[0].reverse();
  let bottom = dissection[2];

  top = findFirstEncounter(top);
  bottom = findFirstEncounter(bottom);

  return [...top, ...bottom];
}

export default function(avatar) {
  const { board, faction, position } = avatar

  return getKillOptions(board, position, faction)
}
