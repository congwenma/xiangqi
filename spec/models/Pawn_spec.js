import { Pawn } from '../../src/models/Avatar';
import Board from '../../src/models/Board'

describe('Pawn', ()=> {
  let pawn
  let board = new Board

  beforeAll(function () {
    pawn = board.at({ x: 0, y: 3 }).avatar;
  })

  afterAll(function () {
    pawn.setCoordinate = board.at({ x: 0, y: 3 });
  })

  it('should be black pawn', function () {
    expect(pawn.faction).toBe('black');
    expect(pawn).toEqual(jasmine.any(Pawn))
  })

  it('#hasCrossedRiver', function () {
    expect(pawn.hasCrossedRiver).toBe(false);
    pawn.placeOn({ x: 0, y: 5 });
    expect(pawn.hasCrossedRiver).toBe(true);
    pawn.placeOn({ x: 0, y: 3 });
  });

  describe('March', ()=> {
    it('should only have one move option initially', function () {
      expect(pawn.moveOptions.length).toBe(1);
      expect(pawn.moveOptions).toContain(board.at({ x: 0, y: 4 }))
    });

    it ('should NOT be able to move more than one block', function () {
      var destination = board.at({ x: 0, y: 5 });

      expect(pawn.moveOptions).not.toContain(destination)
    });

    it ('should NOT be able to move horizontally', function () {
      var destination = board.at({ x: 1, y: 3 });

      expect(pawn.moveOptions).not.toContain(destination)
    });

    it('should be able to move one block ahead', function () {
      var destination = board.at({ x: 0, y: 4 });

      expect(pawn.moveOptions).toContain(destination)
    });

    describe('after crossing river', function () {
      beforeAll(function () {
        pawn.placeOn({ x: 0, y: 5 });
      })

      it('CANNOT move backwards', function () {
        var destination = board.at({ x: 0, y: 4 });

        expect(pawn.moveOptions).not.toContain(destination)
      })

      it('is able to move horizontally one block', function () {
        var destination = board.at({ x: 1, y: 5 });

        expect(pawn.moveOptions).toContain(destination)
      })

      it('is able to move forward', function () {
        var destination = board.at({ x: 0, y: 6 });

        expect(pawn.killOptions).toContain(destination)
      });
    })
  });
});
