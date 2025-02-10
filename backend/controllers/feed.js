const {validationResult} = require('express-validator');

const Post = require('../models/Post');

exports.getPosts = (req, res, next) =>{
  res.status(200).json({
    posts: [{
      _id: '1',
      title: 'First Post',
      content: 'Lorem Ipsum',
      imageUrl: 'images/04fdb386a75cb4c9a2da4696187de8b4.jpg',
      creator: {
        name: 'John',
      },
      createdAt: new Date(),
    }]
  });
};

exports.postPost = (req, res, next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.status = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title:title,
    content: content,
    imageUrl: 'images/04fdb386a75cb4c9a2da4696187de8b4.jpg',
    creator: {
      name: 'John',
    },
  })
  post.save().then(result=>{
    console.log(result);
    res.status(201).json({
      message: 'Post Created Successfully',
      post: result,
    })
  }).catch(err=>{
    if(!err.status){
      err.statusCode = 500;
    }
    next(err);
  });
}