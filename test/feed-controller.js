const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', () => {

  before((done)=>{
    mongoose
      .connect(
        'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test-messages?retryWrites=true'
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'test',
          name: 'test',
          posts: [],
          _id: '5c0f66b979af55031b34728a',
        });
        return user.save();
      }).then(()=>{
      done();
    })
  })

  it('should add a created post to the posts of the creator', (done)=>{

    const req = {
      body: {
        title: 'test',
        content: 'test'
      },
      file:{
        path: 'abc'
        },
      userId: '5c0f66b979af55031b34728a'
    };

    const res = {
      status: ()=>{return this},
      json:()=>{}
    };

    FeedController
      .createPost(req,res, ()=>{})
      .then((savedUser)=>{
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
    })
  })

  after((done)=>{
    User.deleteMany({}).then(()=>{
      return mongoose.disconnect();
    }).then(()=>{
      done();
    });
  })
})