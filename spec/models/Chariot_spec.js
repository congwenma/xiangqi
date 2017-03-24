import { Chariot, Cannon } from '../../src/models/Avatar'
import Board from '../../src/models/Board'

const nit = () => {}

describe('Chariot', ()=> {
  let board = new Board
  let chariot, startingCoord = board[0][0]
  beforeAll(() => chariot = startingCoord.piece)
  beforeEach(() => {chariot.placeOn({ x: 1, y: 5 }) });

  it('#constructor', ()=> {
    expect(chariot).toEqual(jasmine.any(Chariot));
  });

  describe('#moveTo', ()=> {
    it('should throw an error if the intended move is outside of avatar.moveOptions', ()=> {
      expect(() => chariot.moveTo(board[2][6].xy)).toThrow()
    })
  })

  describe('#moveOptions', ()=> {
    it('moveOptions exist', ()=> {
      expect(chariot.moveOptions.length).toBe(11);
    });

    describe('corner chariots start with 2 moves each', function() {
      it('upper left corner', function () {
        let cornerChariot = board[8][0].avatar;
        expect(cornerChariot.moveOptions.length).toBe(2)
      })

      it('lower right corner', function () {
        let cornerChariot2 = board[8][9].avatar;
        expect(cornerChariot2.moveOptions.length).toBe(2)
      })
    })
  })


  describe('#killOptions', ()=> {
    let targettedCannon, targettedPawn;
    beforeAll(function () {
      targettedCannon = board[1][7].avatar;
      targettedPawn = board[0][6].avatar;
    })

    beforeEach(function () {
      // cheating and turning back time
      chariot.placeOn({ x: 1, y: 6 });

      targettedCannon.placeOn({ x: 1, y: 7 });
      targettedPawn.placeOn({ x: 0, y: 6 });

      expect(board[1][7].avatar).toEqual(jasmine.any(Cannon))
    })
    it('should be able to kill units standing in the firing range', () => {
      expect(chariot.killOptions).toContain(board[0][6])
      expect(chariot.killOptions).toContain(board[1][7])
      expect(chariot.killOptions).toContain(board[2][6])
    })

    it('should not be able to kill empty coordinate', function () {
      expect(chariot.killOptions).not.toContain(board[1][4])
    })

    it('should not be able to kill through first encounter', function () {
      expect(chariot.killOptions).not.toContain(board[1][9])
    })

    it('friendly fire should NOT be tolerated', function () {
      expect(chariot.killOptions).not.toContain(board[1][2])
    })

    it('should NOT be able to kill random piece across board', function () {
      expect(chariot.killOptions).not.toContain(board[7][9])
    })
  })
});
