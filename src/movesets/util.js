export const identity = coord => coord

export const withNoAvatar = coord => coord && !coord.avatar

export const hasAvatarEnemyOf = faction => {
  return (coord) => coord && coord.avatar && coord.avatar.faction !== faction
}
