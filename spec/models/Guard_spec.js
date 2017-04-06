import { Guard } from '../../src/models/Avatar'
import Board from '../../src/models/Board'

describe('Guard', ()=> {
  let board = new Board
  let guard, startingCoord = board[3][0]
  beforeAll(function () {
    guard = board[3][0].avatar;
  })

  afterAll(function () {
    guard.placeOn({ x: 3, y: 0 });
  })

  it('should be red guard', function () {
    expect(guard.faction).toBe('black');
    expect(guard).toEqual(jasmine.any(Guard))
  })

  describe('#moveOptions', ()=> {
    it('should only have 1 move option', function () {
      expect(guard.moveOptions.length).toBe(1);
      expect(guard.moveOptions).toContain(board[4][1])
    });

    it('should NOT be able to move outside of the general camp or more than one diagonal blocks', function () {
      var offCamp = board[2][1];
      var othersideOfCamp = board[5][2];
      expect(guard.moveOptions).not.toContain(othersideOfCamp)
      expect(guard.moveOptions).not.toContain(offCamp)
    })

    it('should be able to move to center of the grid', function () {
      var destination = board[4][1];
      expect(guard.moveOptions).toContain(destination)
    })
  })

  describe('#killOptions', () => {
    it('should be able to kill an opponents avatar in range', function () {
      var target = board[0][9].avatar
      var destination = board[4][1]
      target.placeOn({ x: 4, y: 1 })

      expect(guard.killOptions).toContain(destination)
    })
  })
})
