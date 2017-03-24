import { Cannon } from '../../src/models/Avatar'
import Board from '../../src/models/Board'

describe('Cannon', () => {
  let board = new Board
  let cannon
  beforeAll(() => {
    cannon = board[1][2].avatar;
  })

  afterAll(function () {
    cannon.placeOn({ x: 1, y: 2 })
  })

  it('should be black cannon', function () {
    expect(cannon.faction).toBe('black');
    expect(cannon).toEqual(jasmine.any(Cannon))
  })

  describe('Bombard', ()=> {
    it('should only have one kill option', function () {
      expect(cannon.killOptions.length).toBe(1);
    });

    it ('should NOT be able to kill a unit without hopping', function () {
      var target = board[1][7].avatar;
      expect(target).toEqual(jasmine.any(Cannon))
      expect(cannon.killOptions).not.toContain(board[1][7])
    })

    it('should be able to kill red Knight', function () {
      var target = board[1][9].avatar;
      expect(cannon.killOptions).toContain(board[1][9])
    });
  })
});
