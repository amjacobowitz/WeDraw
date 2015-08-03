var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var io = require('socket.io').listen(app.listen(port));



console.log("Listening on port " + port);


app.set('port', port);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');



// These pull all the files together.

//including these here like above, but through modules becuse my app is going to "use" them as routes for the user below.  Inside each one, there are all of the actual routes, but this is telling my app to look in these files for the right routes.  It is e
var index = require('./routes/index');

app.use('/', index);

//this seems to work to add just the public folder to the path instead of all three of its subfolders.  this means that my app will use express to look in the three subfolders of public to find any files it needs.
app.use(express.static(path.join(__dirname, 'public')));

//I am keeping the sockets in this file for now, but I could probably have them in the index file since they aren't really associate with users. 
// io.on === io.sockets.on
io.sockets.on('connection', function(socket){
		socket.on('draw', function(data){
			io.emit('draw', data);
		});
		socket.on('messageSubmit', function(data){
			console.log(data)
			io.sockets.emit('messageUpdate', data);
		})
});









// module.exports = app;