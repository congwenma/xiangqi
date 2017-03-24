import tools from 'surgeonkit';

let config = {
  fieldWidth: 500, // height and width of viewing box
  fieldHeight: 600,
  boardPadding: 50, // shift of all pieces
  spacing: 50, // space between grid points
}

// unspoken variables of chinese chess
var horizontalCount = 9;
var verticalCount = 10;

export let chess = {
  horizontalCount, // 9 coords across
  verticalCount, // 10 coords down
  horizontalGrids: tools.expand(horizontalCount),
  verticalGrids: tools.expand(verticalCount),
};

export default config;
