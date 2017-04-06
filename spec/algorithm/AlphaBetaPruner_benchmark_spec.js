import AlphaBetaPruner, { TreeNode, XiangQiSearcher } from '../../src/algorithm/AlphaBetaPruner'
import Board from '../../src/models/Board'
// import Benchmark from 'benchmark'
const nit = () => {}

const runBenchmark = () => {
  var suite = new Benchmark.Suite
  var searcher = new XiangQiSearcher({ board: new Board })
  suite.add('first move taken', () => {
    searcher.compute()
  })
  .on('cycle', function(event) {
    searcher = new XiangQiSearcher({ board: new Board })
    // console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('done')
  })
  .run({ async: true })
}

describe('XiangqiSearcher Benchmark', () => {
  nit('benchmarks', runBenchmark)
})

