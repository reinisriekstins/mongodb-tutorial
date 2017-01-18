const { expect } = require('chai')
const User = require('../src/user')

describe('Creating records', () => {

  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => {
        expect(joe)
        .to.have.property('isNew')
        .and.equal(false)

        done()
      })
  })

  it('retrieves data from database', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => {
        expect(joe)
        .to.have.property('isNew')
        .and.equal(false)

        done()
      })
  })

})