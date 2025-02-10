const { validationResult } = require('express-validator')

const Post = require('../models/Post')

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res
        .status(200)
        .json({ message: 'Fetched posts successfully', posts: posts })
    })
    .catch(err => {
      if (!err.status) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.postPost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect')
    error.status = 422
    throw error
  }

  const title = req.body.title
  const content = req.body.content
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/04fdb386a75cb4c9a2da4696187de8b4.jpg',
    creator: {
      name: 'John',
    },
  })
  post.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Post Created Successfully',
      post: result,
    })
  }).catch(err => {
    if (!err.status) {
      err.statusCode = 500
    }
    next(err)
  })
}

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then(post => {
        if (!post) {
          const error = new Error('Could not find post');
          error.status = 404
          throw error
        }
        res
          .status(200)
          .json({ message: 'Post found Successfully', post: post })
      }
    )
    .catch(err => {
      if (!err.status) {
        err.statusCode = 500
      }
      next(err)
    })
}