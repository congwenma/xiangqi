import Matrix, { Coordinate } from '../../src/models/Matrix'

describe('model/Matrix', function() {
  let matrix

  const constructor_context = () => {
    it('contains width and height of given size', () => {
      expect(matrix.length).toBe(2)
      expect(matrix[0].length).toBe(2)
    })

    it('contains `Coordinates`', () =>
      expect(matrix[0][0] instanceof Coordinate).toBe(true)
    )
  }

  describe('constructor', () => {
    const [height, width] = [2,2]
    beforeEach(() =>
      matrix = new Matrix({ width, height })
    )
    constructor_context()
  })

  beforeEach(() => matrix = Matrix.from([
    [1, 2],
    [3, 4]
  ]))

  describe('static#from', () => {
    constructor_context()

    it('coordinates arranged in [col][row] format', () => {
      expect(matrix[0][0].value).toBe(1)
      expect(matrix[0][1].value).toBe(2)
      expect(matrix[1][0].value).toBe(3)
      expect(matrix[1][1].value).toBe(4)
    })
  })

  describe('#toValue', () => {
    it('values arranged in [col][row] format', () => {
      expect(matrix.toValues[0][0]).toBe(1)
      expect(matrix.toValues[0][1]).toBe(2)
      expect(matrix.toValues[1][0]).toBe(3)
      expect(matrix.toValues[1][1]).toBe(4)
    })
  })

  describe('#byRows', () => {
    it('coordinates arranged in [row][col] format', () => {
      const byRows = matrix.byRows
      expect(byRows[0][0].value).toBe(1)
      expect(byRows[0][1].value).toBe(3)
      expect(byRows[1][0].value).toBe(2)
      expect(byRows[1][1].value).toBe(4)
    })
  })
})
