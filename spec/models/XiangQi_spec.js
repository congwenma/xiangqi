import XiangQi from '../../src/models/XiangQi'
const nit = () => {}

describe('XiangQi', () => {
  let game = new XiangQi
  describe('constructor', () => {
    nit('red goes first', () => expect(game.player).toBe('red'))
  })
})
