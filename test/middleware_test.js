const { expect } = require('chai')
const mongoose = require('mongoose')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  beforeEach(function(done) {
    this.timeout(5000)

    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is great', content: 'yep it really is' })

    joe.blogPosts.push(blogPost)

    Promise.all([
      joe.save(),
      blogPost.save()
    ])
    .then(() => done())
  })

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        expect(count).to.equal(0)

        done()
      })
  })

})