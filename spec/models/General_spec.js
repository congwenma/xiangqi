import { General } from '../../src/models/Avatar';
import Board from '../../src/models/Board'

describe('General', ()=> {
  let board = new Board
  let general

  beforeAll(function () {
    general = board.at({ x: 4, y: 0 }).avatar;
  })

  afterAll(function () {
    general.setCoordinate = board.at({ x: 4, y: 0 });
  })

  it('should be black general', function () {
    expect(general.faction).toBe('black');
    expect(general).toEqual(jasmine.any(General))
  })

  describe('Proximity', ()=> {
    it('should only have 1 move option', function () {
      expect(general.moveOptions.length).toBe(1);
      expect(general.moveOptions).toContain(board.at({ x: 4, y: 1 }))
    });

    it('should be able to move to center of the camp', function () {
      var destination = board.at({ x: 4, y: 1 });
      expect(() => general.moveTo(destination.xy)).not.toThrow()
      expect(general.position).toEqual({x: 4, y: 1})

      var horizontal = board.at({ x: 3, y: 1 });
      expect(()=> general.moveTo(horizontal.xy)).not.toThrow()
      expect(general.position).toEqual({x: 3, y: 1})
    })

    it('should NOT be able to move outside of the general camp or more than one block at once', function () {
      var offCamp = board.at({ x: 2, y: 1 });
      var othersideOfCamp = board.at({ x: 5, y: 1 });
      expect(general.moveOptions).not.toContain(offCamp)
      expect(general.moveOptions).not.toContain(othersideOfCamp)
    })

    it('should be able to kill an opponents avatar in range', function () {
      var target = board.at({ x: 0, y: 9 }).avatar;
      var destination = board.at({ x: 4, y: 1 });
      target.placeOn(destination);
      expect(general.killOptions).toContain(destination)
    })
  })

  describe('#FlyingGeneral', function () {
    let opponentGeneral
    beforeAll(function () {
      general.placeOn({ x: 4, y: 0 });
      opponentGeneral = board.at({ x: 4, y: 9 }).avatar
    })

    it('should NOT be able to move into an opponents generals clear lane', function () {
      opponentGeneral.placeOn(board.at({ x: 4, y: 8 }));
      general.placeOn(board.at({ x: 3, y: 1 }));
      expect(opponentGeneral.moveOptions).not.toContain(board.at({ x: 3, y: 8 }));
    })

    it('should NOT be able to capture opponents general when units are in the way', function () {
      expect(general.killOptions).not.toContain(board.at(opponentGeneral.position))
    });

    // Disabled due to request of sebastian
    it('should be able to capture opponents general in a straight unblocked line', function () {
      general.placeOn(board.at({ x: 3, y: 1 }));
      opponentGeneral.placeOn(board.at({ x: 3, y: 8 }));
      expect(general.killOptions).toContain(board.at(opponentGeneral.position));
    })
  })
})
