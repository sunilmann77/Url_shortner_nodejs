const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function(email, password, done) {
    try {
        // find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false, { message: 'Invalid Username/Password' });
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport:', err);
        return done(err);
    }
}));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id); // Serialize user ID into the session
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user); // Deserialize user by finding it in the database
    } catch (err) {
        console.log('Error in deserializing user:', err);
        done(err);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    // if the user is signed in, then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signin');
};

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
};

module.exports = passport;
