const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
  mongoose
    .connect('mongodb://localhost/users_test')
    .connection
    .once('open', () => done())
    .on('error', error => console.warn('Error', error))
})



beforeEach((done) => {
  const {
    users,
    comments,
    blogposts
  } = mongoose.connection.collections

  // Promise.all([
  //   users.drop(),
  //   comments.drop(),
  //   blogposts.drop()
  // ]).then(() => done())

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})