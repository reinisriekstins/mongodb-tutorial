const { expect } = require('chai')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let alex, joe, maria, zach

  beforeEach((done) => {
    alex = new User({ name: 'Alex' })
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    zach = new User({ name: 'Zach' })
    
    Promise.all([
      alex.save(),
      joe.save(),
      maria.save(),
      zach.save()
    ])
    .then(() => done())
  })

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        
        expect(users)
          .to.have.lengthOf(1)

        expect(users[0]._id.toString())
          .to.equal(joe._id.toString(), 'users[0]._id not equal to joe._id')

        done()
      })
  })

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        expect(user.name).to.equal('Joe')
        done()
      })
  })

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // sort ascending by name
      .skip(1)
      .limit(2)
      .then((users) => {
        // console.log(JSON.stringify(users, undefined, 2))

        expect(users)
          .to.be.an('array')
          .with.lengthOf(2)

        expect(users[0])
          .to.be.an('object')
          .with.property('name')
          .which.equals('Joe')

        expect(users[1])
          .to.be.an('object')
          .with.property('name')
          .which.equals('Maria')

        done()
      })
  })
})