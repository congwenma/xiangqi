// ui
import _ from 'lodash'
import tools from 'surgeonkit'
import avatarsInfo from './avatars/avatarsInfo'
import Coordinate from './Coordinate'
import {chess} from '../../config/chessConfig';

let Matrix = tools.manufactureArray();
/*
  Formulate a Matrix object with the power to query and control the coordinates on the chessboard.
 */
Object.assign(Matrix.prototype, {
  isMatrix: function () {
    return this[0].length;
  },

  col: function (x) {
    return this[x];
  },

  row: function (y) {
    return this.map(function(col) {
      return col[y];
    });
  },

  coord: function (x, y) {
    try {
      return this[x][y];
    }
    catch(e) {
      return null;
    }
  },

  all: function() {
    return _.flatten(this);
  },

  extinguish: function () {
    return this.all().map(coord => coord.hidden());
  },

  clearFootprint(faction) {
    return this.all().map(coord => {
      if (coord.footprintColor === faction)     
        coord.footprintColor = undefined
    })
  },
  
  // currently used in Chessgame#reset
  clearAllFootprint() {
    this.all().map(
      coord => coord.footprintColor = undefined
    )
  },

  debug: function () {
    return tools.expand(10).map((rowNum) => {
      return this.row(rowNum).map((coord) => {
        return coord.avatar ? avatarsInfo.initials[coord.avatar.name] : '+';
      }).join(' ');
    }).join('\n');
  },

  diff: function(intended_matrix) {
    // diff the avatars block by block gives '-' for expected and '+' for unexpected
  },
})

export const CoordinateMatrix = Matrix;

var {horizontalGrids, verticalGrids} = chess;
let coordinateMatrix = new Matrix(
  ...horizontalGrids.map((xPoint) => {
    return verticalGrids.map((yPoint) => {
      return new Coordinate(xPoint, yPoint);
    })
  })
)
export default coordinateMatrix;
