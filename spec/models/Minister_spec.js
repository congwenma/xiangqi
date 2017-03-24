import { Minister } from '../../src/models/Avatar'
import Board from '../../src/models/Board'

describe('Minister', ()=> {
  let minister
  let board = new Board
  beforeAll(function () {
    minister = board.at({ x: 2, y: 0 }).avatar;
  })

  afterAll(function () {
    minister.setCoordinate = board.at({ x: 1, y: 0 });
  })

  it('should be red knight', function () {
    expect(minister.faction).toBe('black');
    expect(minister).toEqual(jasmine.any(Minister))
  })

  describe('FieldFormation', ()=> {
    it('should only have 2 move option', function () {
      expect(minister.moveOptions.length).toBe(2);
      expect(minister.moveOptions).toContain(board.at({ x: 0, y: 2 }))
      expect(minister.moveOptions).toContain(board.at({ x: 4, y: 2 }))
    });

    it ('should NOT be able to move across with stepping stone', function () {
      var destination = board.at({ x: 0, y: 2 });
      board.at({ x: 0, y: 0 }).avatar.placeOn(board.at({ x: 1, y: 1 }))

      expect(minister.moveOptions).not.toContain(destination)
    });

    it('should be able to move across without stepping stone', function () {
      var destination = board.at({ x: 4, y: 2 });
      expect(minister.moveOptions).toContain(destination)
    });

    it('should NOT be able to move across river', function () {
      minister.placeOn({ x: 2, y: 4 })
      var destination = board.at({ x: 0, y: 6 });
      expect(minister.moveOptions).not.toContain(destination)
    })
  })

  describe('#killOptions', () => {
    it('should be able to kill an opponent in range of field formation', function () {
      var target = board.at({ x: 0, y: 9 }).avatar;

      var destination = board.at({ x: 4, y: 2 })
      target.placeOn(destination.xy)

      expect(minister.killOptions).toContain(destination)
    })
  })
});
