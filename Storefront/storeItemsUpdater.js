


  var storeItemsPrototype = [ // the new store items thang.
    {
      description:"1x3 inch washable Grindhouse Wetware logo patch. Use it to customise your fabric items.",
      warnings: ["noStock"],
      name: "Grindhouse Patch",
      options:[
        ["Red","Green","Blue"],
        ["Circle","Square","Triangle"],
      ],
      price:"350", //not sure if this should be a number or a string
      image:"patch.jpg"
    },
    {
      description:"Crumbly and pungent aged cheddar cheese",
      warnings: ["discontinued","implant"],
      name: "Cheese Wheel",
      options:[
        ["Full","Half","Quarter","Eigth"]
      ],
      price:"90", //not sure if this should be a number or a string
      image:"nsUnit.jpg"
    },
    {
      description:"A super fluffy, one-month-old Golden Retriever puppy. It smells like freshly laundered sheets.",
      warnings: ["dog"],
      name: "Puppy",
      options:[
        ["hungry","not that hungry"]
        ["mellow","frisky"]
      ],
      price:"5", //not sure if this should be a number or a string
      image:"dog.jpg"
    },
  ];



//i'm gonna wrap this whole adventure in a function so i can call it from the app.js whenever i want to alter store items
function coldUpdateStoreItems(storeItemsPrototype) {
//by 'cold' i mean that the db connection doesn't already have to be open. in fact, it has to not be open.

  /* information about store items list, how to generate and store it*/

  //format:




  //connect to the db



  //lets require/import the mongodb native drivers.
  var mongodb = require('mongodb');

  //We need to work with "MongoClient" interface in order to connect to a mongodb server.
  var MongoClient = mongodb.MongoClient;

  // Connection URL. This is where your mongodb server is running.
  var url = 'mongodb://localhost:27017/grindhouseDatabase';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
      if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
          //HURRAY!! We are connected. :)
          console.log('Connection established to', url);
          // this is some serious shit right here.


          //so now store that thing in the mongo database, overwriting your original items list, coz it's shit
           db.collection('storeItems').drop; //removes the entire storeitems collection from the database https://docs.mongodb.com/v3.0/reference/method/db.collection.drop/



          //
          // Connection URL. This is where your mongodb server is running.
          //var url = 'mongodb://localhost:27017/grindhouseDatabase';
          //  db.collection('storeItems')
          //each store item exists as a document in storeItems

          for (var i = storeItemsPrototype.length - 1; i >= 0; i--) {
            db.collection('storeItems').insert(storeItemsPrototype[i]);
          }

  }

}