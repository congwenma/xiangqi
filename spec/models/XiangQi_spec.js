import XiangQi from '../../src/models/XiangQi'

describe('XiangQi', () => {
  let game = new XiangQi
  describe('constructor', () => {
    it('red goes first', () => expect(game.player).toBe('red'))
  })
})
