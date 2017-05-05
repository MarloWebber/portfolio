/*
 * Module dependencies
 */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    querystring = require('querystring');

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

//app.set('views', __dirname + '/views')
//app.set('view engine', 'jade')

//http://stackoverflow.com/questions/17911228/how-do-i-use-html-as-the-view-engine-in-express
app.use(express.static(__dirname + '/public'));

app.use(express.logger('dev'));

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}))

app.use(express.static(__dirname + '/public'));

/*
//do this one first
        //http://stackoverflow.com/questions/35699095/how-to-pass-data-from-angularjs-frontend-to-nodejs-backend
        app.post('/poopdicks', function(req, res) { //when the front end requests the store items // should be /newUser

            

                var yourFuckedMate = false; //generic abort on error flag
                var yourGoodMate = false; // success flag
                var newUser = req.param(newUser);


                //check to see if the user already exists.
                var userExists = false;

                getUserObjects(db, newUser.username, function(usersWithThatName) {
                    if (usersWithThatName.length > 0) {
                        userExists = true;
                    }
                });

                if (userExists) {
                    yourFuckedMate = true;
                    res.send('user already exists');
                }
                else {

                    //add the new user object to the database
                    db.collection('users').insert(User(newUser.username, newUser.password, newUser.email), function(err, results) {
                        if (err != null) {
                            res.send('youre good mate')
                        }
                    });
                }
        });
        */


/*
//provide list of store items
var storeItems = [
{name: "Big Black Ben", price: "29.95", description: "Warning: can't go back! (may be fatal to users under 5'5)."},
{name: "Asian Persuasion", price: "19.95", description: "It might be a needle, but it moves like a sewing machine."},
{name: "I feel like White Tonight", price: "24.95", description: "You'll forget about it by the morning."},
];
*/



var storeItemsPrototype = [ // the new store items thang.
    {
        description: "1x3 inch washable Grindhouse Wetware logo patch. Use it to customise your fabric items.",
        warnings: ["noStock"],
        name: "Grindhouse Patch",
        options: [
            ["Red", "Green", "Blue"],
            ["Circle", "Square", "Triangle"],
        ],
        price: "350", //not sure if this should be a number or a string
        image: "patch.jpg"
    },
    {
        description: "Crumbly and pungent aged cheddar cheese",
        warnings: ["discontinued", "implant"],
        name: "Cheese Wheel",
        options: [
            ["Full", "Half", "Quarter", "Eigth"]
        ],
        price: "90", //not sure if this should be a number or a string
        image: "nsUnit.jpg"
    },
    {
        description: "A super fluffy, one-month-old Golden Retriever puppy. It smells like freshly laundered sheets.",
        warnings: ["dog"],
        name: "Puppy",
        options: [
            ["hungry", "not that hungry"],
            ["mellow", "frisky"]
        ],
        price: "5", //not sure if this should be a number or a string
        image: "dog.jpg"
    },
];




var storeItems = [];




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
        db.collection('storeItems').remove({}); //removes the entire storeitems collection from the database https://docs.mongodb.com/v3.0/reference/method/db.collection.drop/



        //
        // Connection URL. This is where your mongodb server is running.
        //var url = 'mongodb://localhost:27017/grindhouseDatabase';
        //  db.collection('storeItems')
        //each store item exists as a document in storeItems

        for (var i = storeItemsPrototype.length - 1; i >= 0; i--) {
            db.collection('storeItems').insert(storeItemsPrototype[i]);
        }



        /*
        //do this one second
        //http://stackoverflow.com/questions/35699095/how-to-pass-data-from-angularjs-frontend-to-nodejs-backend
          app.post('/authenticate', function (req, res) { //when the front end requests the store items

            //retrieve list of usernames and passwords from database
            getUserObjects(db,req.username,{});

          }
        */


        app.get('/storeItems.json', function(req, res) { //when the front end requests the store items
            db.collection('storeItems').find({}, function(err, cursor) {
                if (err != null) {
                    console.log(err)
                }
                cursor.toArray(function(err, items) { //asynchronously retrieve them from the database
                    if (err != null) {
                        console.log(err)
                    }
                    setStoreItems(items) //update the store items
                    var storeItemsJSON = JSON.stringify(storeItems); //jsonify them
                    res.send(storeItemsJSON); // send them out
                })
            })
        })

/*
        app.get('/user.json', function(req, res) { //when the front end requests the store items
            db.collection('users').find({}, function(err, cursor) {
                if (err != null) {
                    console.log(err)
                }
                cursor.toArray(function(err, items) { //asynchronously retrieve them from the database
                    if (err != null) {
                        console.log(err)
                    }

                    var userJSON = JSON.stringify(user); //jsonify them
                    res.send(userJSON); // send them out
                })
            })
        })
*/

    }


    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Home'
        })
    })

    app.post('/userLogin', function(req, res) {
        // console.log('login attempt');
        if (req.method == 'POST') {
            var body = '';

            req.on('data', function(data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });

            req.on('end', function() {
                var post = querystring.parse(body);

                //   console.log(post);

                getUserObjects(db, post["userLogin[username]"], function(usersWithThatName) {



                    for (var i = 0; i < usersWithThatName.length; i++) {
                        var candidate = usersWithThatName[i];
                        if (candidate.password == post["userLogin[password]"]) {
                            res.send(candidate);
                            break;
                        }

                        // if (i == (usersWithThatName.length -1)) {res.send('Error - Password');}

                    }
                    res.send('Error - Password')
                });



            })
        }
    });

    app.post('/newUser', function(req, res) {

        if (req.method == 'POST') {
            var body = '';

            req.on('data', function(data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });

            req.on('end', function() {
                var post = querystring.parse(body);
                /// console.log(post);// use post['blah'], etc.
                //create new user
                // res.send('Success')

                //  console.log(post);

                //  console.log(post["newUser[username]"]);

                var newUser = User(post["newUser[username]"], post["newUser[password]"], post["newUser[email]"]); //broken because i don't know how to parse body 

                //check to see if the user already exists.
                // var userExists = false;
                getUserObjects(db, newUser.username, function(usersWithThatName) {
                    //console.log(usersWithThatName.length);
                    if (usersWithThatName.length > 0) {

                        res.send('Error - User already exists');

                    } else {


                        //add the new user object to the database
                        //  console.log(newUser)
                        db.collection('users').insert(newUser, function(err, results) {
                            console.log(err);
                            console.log(results);
                            //console.log(results.result.ok);
                            if (results.result.ok == 1) {
                                res.send('Success')
                            } else {
                                res.send(err)
                            }



                        });



                    }
                });



            });
        }
    })



    app.listen(3000); //listen for incoming user connections on (port)



});




function setStoreItems(newStoreItems) {
    storeItems = newStoreItems;
}

function serveStoreItems(req, res) {

}


function getUserObjects(db, username, callback) { //gives the user object corresponding to 'username' to the callback
    db.collection('users').find({
        username: {
            $eq: username
        }
    }, function(err, cursor) {
        cursor.toArray(function(err, items) {
            if (err == null) {
                callback(items);
            } else {
                console.log(err)
            }
        })
    })
}



function User(username, password, email) {

    newUser = {};

    newUser.username = username;
    newUser.password = password;
    newUser.email = email;

    newUser.cart = [];
    newUser.loggedIn = false;

    return newUser;
}