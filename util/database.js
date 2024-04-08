const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;


const mongoConnect = (callback) =>{
    MongoClient.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.5xgasid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        .then(client=>{
            console.log('Connected');
            callback(client);
        })
        .catch(err=>console.log(err));
}

module.exports=mongoConnect;

