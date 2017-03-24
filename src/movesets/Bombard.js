import { getPotentialOptions } from './Straight';
import { identity, withNoAvatar, hasAvatarEnemyOf } from './util'
import tools from 'surgeonkit';

// only returning [second result] or []
const findSecondEncounter = coordinates =>
  coordinates.filter(coord => coord.avatar).slice(1, 2);

function getKillOptions(board, position, faction) {
  const { x, y } = position;
  let {colOptions, rowOptions} = getPotentialOptions(board, position); // explicit about where to look, although getPotentialOptions would be sufficient.
  rowOptions = findSecondEncounterHorizontal(rowOptions, x);
  colOptions = findSecondEncounterVertical(colOptions, y);

  return [...rowOptions, ...colOptions].filter(hasAvatarEnemyOf(faction));
}

function findSecondEncounterHorizontal(rowOptions, x) {
  let dissection = tools.dissect(rowOptions, x, x + 1);
  let left = dissection[0].reverse();
  let right = dissection[2];

  left = findSecondEncounter(left);
  right = findSecondEncounter(right);

  return [...left, ...right];
}

function findSecondEncounterVertical(colOptions, y) {
  let dissection = tools.dissect(colOptions, y, y + 1);
  let top = dissection[0].reverse();
  let bottom = dissection[2];

  top = findSecondEncounter(top);
  bottom = findSecondEncounter(bottom);

  return [...top, ...bottom];
}

export default function Bombard(avatar) {
  const { board, faction, position } = avatar

  return getKillOptions(board, position, faction)
}
