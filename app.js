const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const result = require("ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6627ad4d4099f4150ded3543')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.5xgasid.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`)
    .then(result=>{
        User.findOne().then(user=>{
            if(!user){
                const user = new User({
                    name: 'Test user',
                    email: 'test@test.com',
                    cart: {
                        items: [],
                    }
                })
                user.save();
            }
        })
        app.listen(3000)
    })
    .catch(err=>{console.log(err)})
