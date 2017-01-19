const { Schema } = require('mongoose')

const PostSchema = new Schema({
  title: String
})

module.exports = PostSchema