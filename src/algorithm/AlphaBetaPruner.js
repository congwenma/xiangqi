import EvalModel from './EvalModel'

class NodeBenchmarker {
  constructor() { this.start = process.hrtime() }
  end() {
    this.diff = process.hrtime(this.start)
    return this.result
  }
  get result() {
    return `took ${this.diff[0]}.${this.diff[1]}`
  }
}

class BrowserBenchmarker {
  constructor() { this.start = performance.now() }
  end() {
    this.end = performance.now()
    return this.result
  }
  get calcSeconds() { return (this.end - this.start) / 1000 }
  get result() {
    return `took ${this.calcSeconds} secs.`
  }
}

const findMaxBy = (arr, callback) => arr.reduce(
  (max, item) => max === null || callback(max) < callback(item) ? item : max,
  null
)

const findMinBy = (arr, callback) => arr.reduce(
  (min, item) => min === null || callback(min) > callback(item) ? item : min,
  null
)

// alpha beta tree class
export class TreeNode {
  constructor({ children, parent, isMax = true, value, depth = 0, content }) {
    this.isEvaluated = false
    this.alpha = -Infinity
    this.beta = Infinity

    this.isMax = isMax // must be called before value,
    if(value != null) { this.value = value } // only leaf node has this
    this.depth = depth
    this.content = content

    this.parent = parent
    this.children = children && children.map(
      child => new TreeNode(
        // convert this to object spread once es7 is in place
        Object.assign({}, child, {
          depth: depth + 1,
          isMax: !isMax,
          parent: this
        })
      )
    )
  }

  // evaluation occurs here
  get value() {
    if(!this.isEvaluated) { this.isEvaluated = true }
    return this.isMax ? this.alpha : this.beta
  }

  set value(val) {
    if (this.isMax) { this.alpha = val }
    else { this.beta = val }
  }

  // recursion on search
  search() {
    const { isMax, children } = this
    // when you are on the lowest level, and static evaluations have to be
    // done
    if (isFinite(this.value)) { return this.value } // if this has already been evalled, eval

    if (!children) { return this.value } // if this is the youngest descendant, eval
    if (isMax) {
      children.find(child => {
        var childValue = child.search()

        // this needs to be set first, otherwise, alpha might take default alpha value, which is -Infinity
        this.alpha = Math.max(childValue, this.alpha)
        if (this.parent && this.parent.value < childValue) {
          return true
        }
      })
    }
    else { // isMin
      children.find(child => {
        var childValue = child.search()
        this.beta = Math.min(childValue, this.beta)
        if (this.parent && this.parent.value > childValue) {
          return true
        }
      })
    }
    return this.value
  }

  // TODO: obsolete: invert isMax every node from this point downward
  swapMaxMin() {
    this.isMax = !this.isMax
    this.children && this.children.forEach(child => child.swapMaxMin())
    return this
  }
}

export default class AlphaBetaPruner {
  constructor({ root }) {
    this.root = root
  }

  compute() {
    this.root.search()
    return findMaxBy(this.root.children, child => child.value)
  }
}

var buildChildCount = 0 // small becnhmark TODO: capture this in a class, along with performance metrics

const evalModel = new EvalModel

export class XiangQiSearcher {
  constructor({ board }) {
    this.board = board
    this.buildTree()
  }

  buildTree() {
    const { length: piecesLen } = this.board.alivePieces
    var depth = 2
    if (piecesLen < 24)
      depth = 3
    if (piecesLen < 12)
      depth = 4
    if (piecesLen < 6)
      depth = 5
    if (piecesLen < 4)
      depth = 6
    depth = depth - 1 // slow algorithm when building tree, need to optimize later
    let moves = this.board.allPossibleMoves(false)
    const isMax = false // initial player is black, computer plays black

    this.root = new TreeNode({
      isMax, // defined initially as false
      children: moves.map(move => this.buildChild(move, depth, isMax))
    })
  }

  buildChild(move, depth, isMax, isBeingChecked) {
    // console.log(`calling buildChild ${buildChildCount++} times`)
    var result = { content: move }
    const { avatar, move: position } = move // TODO: remove this awkward rename

    const { position: originPosition } = avatar

    let eaten = this.board.movePiece(avatar, position)
    let moves = this.board.allPossibleMoves(!isMax, { isBeingChecked: isBeingChecked }) // opponent's moves, so !isMax

    // compute result
    if (depth !== 0 && this.board.checkForVictory === 'x') {
      const isChecking = moves.some(move => {
        const avatar = this.board.at(move.move).avatar
        return avatar && avatar.toSingle.toLowerCase() === 'b'
      })

      result.children = moves.map(move => this.buildChild(move, depth-1, !isMax, isChecking))
    } else {
      result.value = evalModel.eval(this.board, 'red')
    }

    // undo this move
    this.board.backPiece(move.avatar, eaten, originPosition)
    return result
  }

  // @returns best possible move option in children
  compute() {
    this.root.search()
    return findMinBy(this.root.children, child => child.value)
  }
}
