const { expect } = require('chai')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save().then(() => done())
  })

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // console.log(users)
        expect(users)
          .to.have.lengthOf(1)

        expect(users[0]._id.toString())
          .to.equal(joe._id.toString(), 'users[0]._id not equal to joe._id')

        done()
      })
      .catch(console.error)

    expect().to
  })
})