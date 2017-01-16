const { expect } = require('chai')
const User = require('../src/user')

describe('Creating records', () => {

  it('checks basic arithmetic', () => {
    expect(1 + 1).to.equal(2)
  })

  it('tries the not method', () => {
    expect(1 + 1).to.not.equal(3)
  })

  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })
    // expect(joe)
    //   .to.have.property('name')
    //   .and.equal('Joe')

    joe.save()
  })
})