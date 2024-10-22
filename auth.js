const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

// username ans password authentictaion
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  //authentication logic here
  try {
    // console.log("Credentials Recieved: ", USERNAME, password);
    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect Usernmae.' });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.' })
    }
      
  } catch (err) {
    return done(err);
  }
}));


module.exports = passport;