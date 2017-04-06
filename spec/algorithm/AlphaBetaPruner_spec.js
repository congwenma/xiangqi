import AlphaBetaPruner, { TreeNode, XiangQiSearcher } from '../../src/algorithm/AlphaBetaPruner'
import Board from '../../src/models/Board'

describe('XiangQiSearch', () => {
  let searcher
  let board

  beforeEach(() => {
    board = new Board
    searcher = new XiangQiSearcher({ board })
  })

  describe('#buildTree', () => {
    it('sets a treeNode to #root', () => {
      expect(searcher.root instanceof TreeNode).toBe(true)
    })
  })

  describe('#compute', () => {
    let result
    beforeEach(() => result = searcher.compute())

    it('returns a `content`, which is a move', () => {
      expect(result.content.avatar).toBeDefined()
      expect(result.content.move).toBeDefined()
    })

    it('just curious what would this be', () => {
      var s = searcher
      console.warn(result.content.avatar.toSingle,
      result.content.move.xy, result.value)
    })

    it('returns a value', () => {
      expect(typeof result.value).toBe('number')
    })

    describe('on a checkmate scenario', () => {
      beforeEach(() => {
        board = Board.read([
          'C . . . . . . . . .',
          '. . . . . . . . . .',
          '. . . . . . . . . .',
          '. . . . . . . . . .',
          'B . . . . . . . . b',
          '. . . . . . . . . .',
          '. . . . . . . . . .',
          '. . . . . . . . . .',  // [1, x]
          '. . . . . . . . . .'   // [0, x]
        ])
        result = new XiangQiSearcher({ board }).compute()
      })

      it('returns a value of minPlayer (black) checkmate', () => {
        expect(result.value < -1000 * 1000).toBe(true)
      })
    })
  })
})

// 16 number prune: 43622195315475
//                     ^  ^^^^   ^
describe('AlphaBetaPruner', () => {
  let tree

  describe('#compute', () => {
    describe('2 number case', () => {
      beforeEach(() => {
        tree = new TreeNode({ // max
          children: [
            { value: 4 },
            { value: 3 }
          ]
        })
      })

      it('should return the greater of its children node', () => {
        expect(new AlphaBetaPruner({ root: tree }).compute()).toBe(tree.children[0])
      });

      it('should set the value of root to the bigger value of 4 and 3', () => {
        new AlphaBetaPruner({ root: tree }).compute()
        expect(tree.value).toBe(4)
      })
    })

    describe('4 number cases(n-Max-Min)', () => {
      const construct4 = (a,b,c,d) => {
        return new TreeNode({ // min
          isMax: false,
          children: [ // max
            // both max, pick best out of each
            { children: [ { value: a }, { value: b } ]},
            { children: [ { value: c }, { value: d } ]},
          ]
        })
      };
      describe('4,3,6,2 -> 4,6 -> 4', () => {
        beforeEach(() => {
          tree = construct4(4,3,6,2)
          new AlphaBetaPruner({ root: tree }).compute()
        })
        it('max should return 4 since min player will pick the pair of node between (4,3) and (6,2) that yield a lower alpha', () => {
          expect(tree.value).toBe(4)
          expect(tree.children[0].value).toBe(4)
          expect(tree.children[1].value).toBe(6)
        })

        it('should have PRUNED 2', () => {
          expect(tree.children[0].children[0].isEvaluated).toBe(true)
          expect(tree.children[0].children[1].isEvaluated).toBe(true)
          expect(tree.children[1].children[0].isEvaluated).toBe(true)
          expect(tree.children[1].children[1].isEvaluated).toBe(false)
          expect(tree.children[1].children[1].value).toBe(2)
        })
      })

      describe('5,4,7,5 -> 5,7 -> 5', () => {
        beforeEach(() => {
          tree = construct4(5,4,7,5)
          new AlphaBetaPruner({ root: tree }).compute()
        })
        it('max should return 4 since min player will pick the pair of node between (4,3) and (6,2) that yield a lower alpha', () => {
          expect(tree.value).toBe(5)
          expect(tree.children[0].value).toBe(5)
          expect(tree.children[1].value).toBe(7)
        })
      })
    })

    describe('16 number case', () => {
      beforeEach(() => {
        tree = new TreeNode({ // max
          children: [ // all min, 3 children
            {
              children: [ // all max, 2 children
                { children: [{ value: 4 }, { value: 3 }] },
                { children: [{ value: 6 }, { value: 2 }] }
              ]
            },
            {
              children: [ // all max, 3 children
                { children: [{ value: 2 }, { value: 1 }] },
                { children: [{ value: 9 }, { value: 5 }] },
                { children: [{ value: 3 }, { value: 1 }] }
              ]
            },
            {
              children: [ // all max, 2 children
                { children: [{ value: 5 }, { value: 4 }] },
                { children: [{ value: 7 }, { value: 5 }] }
              ]
            }
          ]
        })
        new AlphaBetaPruner({ root: tree }).compute()
      })

      it('max should return 5', () => {
        expect(tree.value).toBe(5)
        expect(tree.children[0].children[1].children[1].isEvaluated).toBe(false)

        expect(tree.children[1].children[1].isEvaluated).toBe(false)
        expect(tree.children[1].children[1].children[0].isEvaluated).toBe(false)
        expect(tree.children[1].children[1].children[1].isEvaluated).toBe(false)

        // and its two children implied to not have been explroed
        expect(tree.children[1].children[2].isEvaluated).toBe(false)

        expect(tree.children[2].children[1].children[1].isEvaluated).toBe(false)
      })
    })
  })
})
