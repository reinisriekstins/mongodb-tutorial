const { expect } = require('chai')
const User = require('../src/user')

describe('Creating records', () => {

  // it('checks basic arithmetic', () => {
  //   expect(1 + 1).to.equal(2)
  // })

  // it('tries the not property', () => {
  //   expect(1 + 1).to.not.equal(3)
  // })

  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save().then(() => {
      expect(joe)
      .to.have.property('isNew')
      .and.equal(false)

      done()
    })
  })

  it('retrieves data from database', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save().then(() => {
      expect(joe)
      .to.have.property('isNew')
      .and.equal(false)

      done()
    })
  })
})