var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST, but I am not very clear how.  It essentially does the same type of rigging that was done with sinatra to fake a delete route, I believe.  Does it apply to put too?  It is certainly well named! ha.


// I copied and pasted the below middleware.  It allows me to parse bodies of requests and do deletes on the client side.  I don't believe it affects the database because mongoose is never called.
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
	.get(function(req, res, next){
		mongoose.model('User').find({}, function(err, users){
			if (err){
				return console.error(err);
			} else {
				res.format({
					html: function(){
						// this will render a html page that I make in jade in my views folder.  The users part is setting  variable that I can access in my jade file just like you do with the erb files and instance variables in ruby.
            res.render('users/index', {
                  title: 'All my Users',
                  "users" : users
            });
        	},
    		});
			}
		})
	})
	.post(function(req, res){
		//get the variables out of the request body first.  I can do this because I included the body-parser above.
		var name = req.body.name;
		var username = req.body.username;
		var age = req.body.age;
		var married = req.body.married;

		//then, I create a new user in the database just like I would in a post in activerecord, even the same command

		mongoose.model('User').create({
			name: name,
			username: username,
			age: age,
			married: married
		}, function(err, user){
			if (err) {
				res.send("Oops, there was a problem processing the information to our database.  Sorry about that.  We are working on it now!")
				//created user if get to here!
			} else {
				console.log('POST creating: ' + user);
				// set the format of the response, could use html, json, xml and others, but for now I am just doing the html where I render until I get into asynchronous calls.
				res.format({
					html: function(){
						//this sets the url address bar to the page I want to go to, but doesn't actually redirect.
						res.location('users');
						//here is where I actually redirect to a new page
						res.redirect('/users');
					}
				});
			}
		});
	});

router.get('/new', function(req, res){
	// render the jade in this file and pass in these variables, very similar to locals in an erb call.
	res.render('users/new', {title: 'Add New User'});
})

// this is router middleware to validate that the id exists, I beleive.  a bit confusing still.
router.param('id', function(req, res, next, id){
	mongoose.model("User").findById(id, function(err, user){
		//this is error handling that will display the issue in the console, respond with a 404 status to the http request and send the error out of the middleware with the next function.
		if (err){
			console.log(id + ' was not found');
			res.status(404);
			var err = new Error('not found');
			err.status = 404;
			//again, I could also send json back if I was creating an api/single page app, but I only did html here.
			res.format({
				html: function(){
					next(err);
				}
			})
			//if you made it here, we found it!
		} else {
			// very importantly, we save the id here into the request object so that we can access it in upcoming routes because the id is obviously not provided by the user.
			req.id = id;
			next();
		}
	});
});

//whenever I am calling router.route I am essentially creating a namespace for the new route.
// I will use this route for the individual show.
router.route('/:id')
	.get(function(req, res){
		//I can find by id because of the middleware I used above to add the id to the request
		mongoose.model('User').findById(req.id, function(err, user){
			//again and always, error handling here
			if (err){
				console.log('GET error: there was a problem finding: ' +  err)
			} else {
				res.format({
					html: function(){
						//again passing in locals here, well in a way.  essentially finding what I got from the db and passing it in so that I can view it in the jade template I render.
						res.render('users/show', {
							"user": user
						})
					}
				})
			}
		})
	})

// I set up this route to be able to edit and delete on the same page/route.  It does not need to be done this way, I believe.  But, it is convenient because it allows for me to use the middleware again to get the id out of the request object and find easily.
router.route('/:id/edit')
	.get(function(req, res){
		mongoose.model('User').findById(req.id, function(err, user){
			if (err){
				console.log("GET error : " + err)
			} else {
				console.log('found user')
				//I could do things to the information I have from the database here, like edit its format.
				res.format({
					html: function(){
						res.render('users/edit', {"user":user})
					}
				})
			}
		})
	})

	.put(function(req, res){
		//I am pulling all of the info out of the request body here, similar to taking our to params in rails and sinatra.
		var name = req.body.name;
		var username = req.body.username;
		var age = req.body.age;
		var married = req.body.married;

		mongoose.model('User').findById(req.id, function(err, user){
			//this is a mongoose method to update the db, exactly the same as the create I saw above!
			user.update({
				name: name,
				username: username,
				age: age,
				married: married
			}, function(err, user){
				if (err){
					res.send("There was a problem.  Oops.." + err)
				} else {
					res.format({
						html: function(){ 
							res.redirect('/users');
						}
					})
				}
			})
		})
	})

	.delete(function(req, res){
		mongoose.model('User').findById(req.id, function(err, user){
			user.remove(function(err, user){
				if (err) {
					return console.error(err)
				} else {
					res.format({
						html: function(){
							res.redirect('/users')
						}
					});
				}
			});
		});
	});

module.exports = router;



