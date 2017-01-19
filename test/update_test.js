const { expect } = require('chai')
const User = require('../src/user')

function checkLengthAndName(done) {
  User.find({})
    .then((users) => {
      expect(users).to.have.lengthOf(1)
      expect(users[0].name).to.equal('Alex')

      done()
    })
}

describe('Updating records', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 })
    joe.save().then(() => done())
  })

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex').save()
      .then(() => checkLengthAndName(done))
  })

  it('A model instance can update', (done) => {
    joe.update({ name: 'Alex' })
      .then(() => checkLengthAndName(done))
  })

  it('A model class can update', (done) => {
    User.update({ name: 'Joe' }, { name: 'Alex' })
      .then(() => checkLengthAndName(done))
  })

  it('A model class can update one record', (done) => {
    User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
      .then(() => checkLengthAndName(done))
  })

  it('A model class can find a record with a Id and update', (done) => {
    User.findByIdAndUpdate(joe._id, { name: 'Alex' })
      .then(() => checkLengthAndName(done))
  })

  it('can increment the user\'s likes by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.likes).to.equal(1)
        done()
      })
  })
})