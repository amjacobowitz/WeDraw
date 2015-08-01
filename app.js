//this lets you parse the body of html requests to get the "params out"
var bodyParser = require('body-parser')
//this incorporates express into my node.js and then calls the function to make the app
var app = require('express')();
//this starts my server for my backend with the app as an input
var http = require('http').Server(app)
//this starts the sockets for this server
var io = require('socket.io')(http);


//this is just a shorter way to set up the server to work with socket io
// var io = require('socket.io').listen(server, function() {
//         console.log("Express server listening on port " + app.get('port'));
// });

// app.use('/javascripts',express.static(path.join(__dirname, 'public/javascripts')));
app.use(bodyParser.urlencoded({ extended: false }));

// set the project to use jade as the template engine instead of basic html
// I can't seem to get this to work with sockets though.  Not finding where I save the sockets.
// app.set('view engine', 'jade');

// these are how to write routes for the same base-route, i.e. get, post, delete, put
app.route('/users')
  .get(function(req, res){
    res.sendfile('index.html')
  })
  .post(function(req, res){
    res.sendfile('index.html', {title: 'Hey', message: req.body.input} )
  })

// this is how to access params from a route that uses a wildcard-type-thingy, but not from post
app.get('/users/:user', function(req, res){
  res.render('index', {title: 'Hey', message: 'hello there!', input: req.params.user})
})

//Connect to the Node.js Server
io.on('connection', function(socket){
  console.log('a user connected')
})


http.listen(3000, function(){
  console.log('listening on *:3000');
})












// //send a ping event to the server from the client
// console.log('socket: browser says ping (1)')
// io.emit('ping', {some: data});

// //how a client connects to the server (opens up a socket)
// io.sockets.on('connection', function(socket){
//   socket.on('ping', function(data){
//     console.log('socket: server receives ping (2)');
//   })

//   socket.emit('pong', data)
//   console.log('socket: server sends pong (3)')
// })

// //when the client receives a pong event from the server, console log the message
// io.on('pong', function(data){
//   console/log('socket: broswer received pong (4)', data)
// })
