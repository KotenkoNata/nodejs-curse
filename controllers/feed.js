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
  const title = req.body.title;
  const content = req.body.content;
  //create post
  res.status(201).json({
    message: 'Post Created Successfully',
    post: {
      id: new Date().toISOString(),
      title:title,
      content: content,
    }
  })
}