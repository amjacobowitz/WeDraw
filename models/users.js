var mongoose = require('mongoose')

//create a mongodb schema like activerecord migration.  Many possible Schema Types.
var userSchema = new mongoose.Schema({
	name: String,
	username: String,
	age: Number,
	married: Boolean
})

// create an instance method available on the instances of the model I will define next.
userSchema.methods.findSimilarNames = function (cb) {
  return this.model('User').find({ name: this.name }, cb);
}
//create a model just like an activerecord model, but these can save custom methods too, as seen above!!  I might be able to do that in activerecord too, but I have never tried.  It is just so eay here!
mongoose.model('User', userSchema);


