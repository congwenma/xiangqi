export const AvatarBaseValues = {
  B: 1000000, // as in boss, lol!
  b: 1000000, // as in boss, lol!

  C: 400,
  c: 400,

  R: 600, // as in rook
  r: 600, // as in rook

  K: 300,
  k: 300,

  G: 110,
  g: 110,

  M: 110,
  m: 110,

  P: 70,
  p: 70
}

const expand = n => Object.keys([...Array(n)])

// stub for units that cannot cross river, Minister, General and Guard
const stubValues = expand(9).map(xCol =>
  expand(10).map(_ => -1)
)

// use this function to convert original array to [x][y] format, left vs right instead of top vs bottom
const swapXY = matrix => {
  var mat2 = []
  matrix.forEach((yRow, y) =>
    yRow.forEach((xColPiece, x) => {
      mat2[x] = mat2[x] || [];
      mat2[x][y] = xColPiece
    })
  )
  return mat2
}

const CannonPositionValues = [
  // left is enemy, consider inverting
  [ 6, 2, 2, 0, 0, -2, 0, 4, 0, 0 ],
  [ 4, 2, 2, 0, 0, 0, 0, 0, 2, 0 ],
  [ 0, 0, 0, -2, 0, 4, 0, 8, 4, 2 ],
  [ -10, -4, -10, 4, 2, 2, 2, 6, 6, 6 ],
  [ -12, -14, -8, 10, 8, 6, 4, 12, 6, 6 ],
  [ -10, -4, -10, 4, 2, 2, 2, 6, 6, 6 ],
  [ 0, 0, 0, -2, 0, 4, 0, 8, 4, 2 ],
  [ 4, 2, 2, 0, 0, 0, 0, 0, 2, 0 ],
  [ 6, 2, 2, 0, 0, -2, 0, 4, 0, 0 ],
];

const ChariotPositionValues = [
  [ 14, 16, 12, 12, 12, 12, 6, 4, 8, -2 ],
  [ 14, 20, 12, 18, 14, 16, 10, 8, 4, 10 ],
  [ 12, 18, 12, 16, 12, 14, 8, 6, 8, 6 ],
  [ 18, 24, 18, 22, 18, 20, 14, 14, 16, 14 ],
  [ 16, 26, 18, 22, 18, 20, 14, 12, 8, 12 ],
  [ 18, 24, 18, 22, 18, 20, 14, 14, 16, 14 ],
  [ 12, 18, 12, 16, 12, 14, 8, 6, 8, 6 ],
  [ 14, 20, 12, 18, 14, 16, 10, 8, 4, 10 ],
  [ 14, 16, 12, 12, 12, 12, 6, 4, 8, -2 ],
];

const KnightPositionValues = [
  [ 4, 4, 12, 8, 6, 4, 2, 4, 0, 0 ],
  [ 8, 10, 14, 24, 16, 12, 6, 2, 2, -4 ],
  [ 16, 28, 16, 18, 14, 16, 8, 8, 4, 0 ],
  [ 12, 16, 20, 24, 18, 14, 6, 8, 4, 0 ],
  [ 4, 8, 18, 20, 16, 12, 10, 4, -2, 0 ],
  [ 12, 16, 20, 24, 18, 14, 6, 8, 4, 0 ],
  [ 16, 28, 16, 18, 14, 16, 8, 8, 4, 0 ],
  [ 8, 10, 14, 24, 16, 12, 6, 2, 2, -4 ],
  [ 4, 4, 12, 8, 6, 4, 2, 4, 0, 0 ],
];

const PawnPositionValues = [
  [ 0, 18, 14, 10, 6, 2, 0, 0, 0, 0 ],
  [ 3, 36, 26, 20, 12, 0, 0, 0, 0, 0 ],
  [ 6, 56, 42, 30, 18, 8, -2, 0, 0, 0 ],
  [ 9, 80, 60, 34, 18, 0, 0, 0, 0, 0 ],
  [ 12, 120, 80, 40, 20, 8, 4, 0, 0, 0 ],
  [ 9, 80, 60, 34, 18, 0, 0, 0, 0, 0 ],
  [ 6, 56, 42, 30, 18, 8, -2, 0, 0, 0 ],
  [ 3, 36, 26, 20, 12, 0, 0, 0, 0, 0 ],
  [ 0, 18, 14, 10, 6, 2, 0, 0, 0, 0 ],
];

const invertY = valueMatrix => valueMatrix.map(
  xCol => xCol.slice().reverse()
)

export const AvatarPositionValues = {
  // Cannon
  C: invertY(CannonPositionValues),
  c: CannonPositionValues,

  // Rook, Chariot
  R: invertY(ChariotPositionValues),
  r: ChariotPositionValues,

  // Knight
  K: invertY(KnightPositionValues),
  k: KnightPositionValues,

  // Pawn
  P: invertY(PawnPositionValues),
  p: PawnPositionValues,

  // Guard, not necessary?
  G: stubValues,
  g: stubValues,

  // Minister, not necessary?
  M: stubValues,
  m: stubValues,

  // Boss, General, not necessary?
  B: stubValues,
  b: stubValues
}
