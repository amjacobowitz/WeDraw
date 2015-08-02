
//connect to mongoDB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

//only need these two lines if using mongoose
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')


















//below is from experimenting with adding to mongo without mongoose.  This appear innecificent and I like the models and schemas + the methods provided by mongoose.  I plan on using mongoose for the time being.

// test is DB connected
// //MongoDB without Mongoose, but why do that when you can make models and schemas with mongoose??
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });


// var insertDocument = function(db, callback) {
//    db.collection('restaurants').insertOne( {
//       "address" : {
//          "street" : "2 Avenue",
//          "zipcode" : "10075",
//          "building" : "1480",
//          "coord" : [ -73.9557413, 40.7720266 ],
//       },
//       "borough" : "Manhattan",
//       "cuisine" : "Italian",
//       "grades" : [
//          {
//             "date" : new Date("2014-10-01T00:00:00Z"),
//             "grade" : "A",
//             "score" : 11
//          },
//          {
//             "date" : new Date("2014-01-16T00:00:00Z"),
//             "grade" : "B",
//             "score" : 17
//          }
//       ],
//       "name" : "Vella",
//       "restaurant_id" : "41704620"
//    }, function(err, result) {
//     assert.equal(err, null);
//     console.log("Inserted a document into the restaurants collection.");
//     callback(result);
//   });
// };

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   insertDocument(db, function() {
//       db.close();
//   });
// });


// var findRestaurants = function(db, callback) {
//    var cursor = db.collection('restaurants').find( { "grades.score": {$gt: 30 } } );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };


// MongoClient.connect(url, function(err, db){
//   assert.equal(null, err);
//   findRestaurants(db, function(){
//     db.close();
//   })
// })

