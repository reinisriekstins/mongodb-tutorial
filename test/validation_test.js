const { expect } = require('chai')
const User = require('../src/user')

describe('Validating records', () => {

  it('requires a user name', () => {
    const
      user = new User({ name: undefined }),
      validationResult = user.validateSync(),
      { message } = validationResult.errors.name

    expect(message).to.equal('Name is required')
  })

  it('requires a name that\'s longer than 2 characters', () => {
    const
      user = new User({ name: 'Al' }),
      validationResult = user.validateSync(),
      { message } = validationResult.errors.name

    expect(message).to.equal('Name must be longer than 2 characters')
  })

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' })
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name

        expect(message).to.equal('Name must be longer than 2 characters')
        done()
      })
  })

})