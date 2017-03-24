export const expand = (num) => Object.keys([...new Array(num)])

export class Coordinate {
  constructor (xPoint, yPoint, value = null) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.value = value;
  }

  get xy() {
    return { x: this.xPoint, y: this.yPoint }
  }

  get x() { return this.xPoint; }
  get y() { return this.yPoint; }

  get piece() { return this.value }
  get avatar() { return this.value }
  set piece(piece) {
    this.value = piece || null
  }

  get show() {
    return `Coord x: ${this.xPoint}, y: ${this.yPoint}, piece: ${this.value}`;
  }

  get isEmpty() { return this.value === null }
}

export default class Matrix extends Array {
  constructor({ width, height }) {
    super(
      ...expand(width).map((colX, x) =>
        expand(height).map((coord, y) =>
          new Coordinate(x, y)
        )
      )
    )
  }

  static from(_2dArray) {
    const [width, height] = [_2dArray.length, _2dArray[0].length]
    const inst = new this({ width, height })

    // inserting values into the inst
    _2dArray.forEach((xCol, x) =>
      xCol.forEach((value, y) =>
        inst[x][y] = new Coordinate(x, y, value)
      )
    )
    return inst
  }

  // opposite of from
  get toValues() {
    return this.map(
      xCol => xCol.map(coord => coord.value)
    )
  }

  get byRows () {
    var arr = Object.keys([...Array(this[0].length)]) // construct array of length = num of rows
      .map(i => [])

    this.forEach(xCol => {
      xCol.forEach(
        (coord, y) => arr[y].push(coord)
      )
    })

    return arr
  }

  col(x) { return this[x] }
  row(y) { return [...this.map(col => col[y])] }

  toString() {
    return [
      '',
      ...this.byRows.map(
        yRow => yRow.map(coord => coord || '_').join(' ')
      ),
      ''
    ].join('\n')
  }

  view() {
    // console.info(this.toString())
  }
}

Matrix.Coordinate = Coordinate
