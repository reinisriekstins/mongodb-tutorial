const { expect } = require('chai')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: [
        { title: 'postTitle' },
        { title: 'anotherTitle' }
      ]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user)
          .to.have.property('posts')
          .which.is.an('array')
          .with.a.lengthOf(2)

        expect(user.posts[0])
          .to.have.property('title')
          .and.equal('postTitle')

        done()
      })
  })

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'a new post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts[0])
          .to.have.property('title')
          .and.equal('a new post')

        done()
      })
  })

  it('Can remove subdocuments form an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [
        { title: 'an existing post' }
      ]
    })

    joe.save()
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts).to.have.lengthOf(0)
        done()
      })
  })
})