


//mongodb experiments




//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/grindhouseDatabase';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

//construction zone :)

//check to see if the record exists

// if it doesn't exist, create it


	//db.collection.insertOne() inserts a single document into a collection.

//read the record into an object

	//db.users.find( {} ) selects all documents in collection, equivalent to db.users.find()






  }
});