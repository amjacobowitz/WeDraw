var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var app = express();
var port = 3000;
var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')))
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: false }));





app.route('/')
  .get(function(req, res){
    res.render('layout')
  })
  // .post(function(req, res){
  //   res.redirect('/'+req.body['room'])
  // })


// This will get you to a different route from the post, but it will not open different sockets.  Right now it will just make sure no one can accidently go to an extended route.
app.get('/:room', function(req, res){
  res.render('layout')
})




// io.on === io.sockets.on
io.sockets.on('connection', function(socket){
	// setTimeout(function(){
		socket.on('draw', function(data){
			io.emit('draw', data)
		});
	// }, 200);
});






