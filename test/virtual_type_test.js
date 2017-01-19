const { expect } = require('chai')
const User = require('../src/user')

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: [
        { title: 'a post title' }
      ]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.postCount).to.equal(1)
        done()
      })
  })
})