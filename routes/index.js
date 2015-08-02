var express = require('express');
var router = express.Router();


//this is the home page route, i.e. index of our whole app.  I added the next so that I could add middleware later on if I want, but I am not using it right now.
router.get('/', function(req, res, next){
    res.render('index')
  })

module.exports = router;