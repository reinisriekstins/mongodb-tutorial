const { expect } = require('chai')
const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment
  
  beforeEach(function(done) {
    this.timeout(5000)

    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is great', content: 'yep it really is' })
    comment = new Comment({ content: 'congratz on great stuff' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save()
    ])
    .then(() => done())
  })

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        expect(user)
          .to.have.property('blogPosts')
          .which.is.an('array')
          .with.lengthOf(1)

        expect(user.blogPosts[0])
          .to.have.property('title')
          .which.equals('JS is great')

        done()
      })
  })

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        // console.log(JSON.stringify(user, undefined, 2))
        expect(user.blogPosts[0])
          .to.have.property('comments')
          .which.is.an('array')
          .with.lengthOf(1)
        
        expect(user.blogPosts[0].comments[0])
          .to.have.property('user')
          .which.is.an('object')
          .that.has.a.property('name')
          .which.equals('Joe')

        done()
      })
  })
})