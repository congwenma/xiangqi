/*eslint-env node, jasmine */
/*eslint no-console: false*/

import { Knight } from '../../src/models/Avatar';
import Board from '../../src/models/Board'

describe('Knight', ()=> {
  let knight
  let board = new Board

  beforeAll(function () {
    knight = board[1][0].avatar;
  })

  afterAll(function () {
    knight.placeOn(board[1][0].xy);
  })

  it('should be red knight', function () {
    expect(knight.faction).toBe('black');
    expect(knight).toEqual(jasmine.any(Knight))
  })

  describe('SunFormation', ()=> {
    it('should only have 2 move option', function () {
      expect(knight.moveOptions.length).toBe(2);
      expect(knight.moveOptions).toContain(board[0][2])
      expect(knight.moveOptions).toContain(board[2][2])
    });

    it ('should NOT be able to move across with stepping stone', function () {
      var destination = board[3][1];

      expect(knight.moveOptions).not.toContain(destination)
    });

    it('should be able to move across without stepping stone', function () {
      var destination = board[2][2];
      expect(knight.moveOptions).toContain(destination)
    });

    it('should be able to kill an enemy avatar if its within move option', function () {
      var target = board[0][9].avatar;
      target.placeOn({ x: 0, y: 2 })

      expect(knight.killOptions).toContain(board[0][2])
    })
  })
});
