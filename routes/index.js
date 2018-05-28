//required elements to run
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/posterdb';

// when posting on this, do this...
router.post('/', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/posterdb';


  MongoClient.connect(CONNECTION_URI, function(err, db){
    if (err){
      console.log("Unable to connect", err);
    } else {
      console.log('Connected to server');

      var collection = db.collection('posters');
      var poster1 = {Message: req.body.Message, Location: req.body.Location};
      var poster2 = [poster1];
      var id = req.body.id;
      //var poster1 = {Message: req.body.locationdup, Location: req.body.locationdup};
      console.log("I'm loggin poster1 var: ");
      console.log([poster1]);
      //

      //
//
      collection.insert(poster2, function(err, result){
        if (err){
          console.log(err);
        } else {
            let id = result["ops"][0]["_id"];
            res.redirect("/poster?id="+id+"#section-poster");
            console.log('success');
            console.log('searching db...')
            collection.find(ObjectId(id)).toArray(function (err, docs) {
              db.close();

              if (err) {
                console.log('Insert Error');
                console.log(err);
              //  res.end();
              }
              else {
                console.log("Insert Success");
                console.log(docs);
              //  res.json(docs);
              }
            });
            //db.close();
        };
      });
    };
  });

});




//duplicate test
router.get('/', function(req, res, next){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/posterdb';

  const posterQID = req.query.id;

  MongoClient.connect(CONNECTION_URI, function(err, db){
    if(err){
      console.log('Unable to connect to the server', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('posters');

      collection.find(ObjectId(posterQID)).toArray(function (err, docs) {

        if (err) {
          console.log('Find Error');
          console.log(err);
          res.end();
        }
        else {
          console.log("Find Success");
          console.log(docs);
          collection.find({}).toArray(function(err, result){
            if (err){
              res.send(err);
            } else if (result.length){
              res.render('index', { title: 'Support 4 Grenfell', "posterlist" : result, "messagelist" : docs });
              //res.render('posterlist', { "posterlist" : result });
            } else {
              res.send('No documents found');
            };
            db.close();
        //  res.render('index', { title: 'Support 4 Grenfell', "posterlist" : result });
        //  res.render('index', { title: 'Support 4 Grenfell', "posterlist" : docs  });
      });
    }; //end else
  });

};



});

});

///

//poster page
router.get('/poster', function(req, res, next){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/posterdb';

  const posterQID = req.query.id;

  MongoClient.connect(CONNECTION_URI, function(err, db){
    if(err){
      console.log('Unable to connect to the server', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('posters');

      collection.find(ObjectId(posterQID)).toArray(function (err, docs) {

        if (err) {
          console.log('Find Error');
          console.log(err);
          res.end();
        }
        else {
          console.log("Find Success");
          console.log(docs);
          collection.find({}).toArray(function(err, result){
            if (err){
              res.send(err);
            } else if (result.length){
              res.render('index', { title: 'Support 4 Grenfell', "posterlist" : result, "messagelist" : docs });
              //res.render('posterlist', { "posterlist" : result });
            } else {
              res.send('No documents found');
            };
            db.close();
        //  res.render('index', { title: 'Support 4 Grenfell', "posterlist" : result });
        //  res.render('index', { title: 'Support 4 Grenfell', "posterlist" : docs  });
      });
    }; //end else
  });

};



});

});


module.exports = router;
