const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment
  
  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is great', content: 'yep it really is' })
    comment = new Comment({ content: 'congratz on great stuff' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.author = joe
  })
})