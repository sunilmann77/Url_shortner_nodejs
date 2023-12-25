const ShortUrl = require("../model/shortUrl"); 
const User = require("../model/user");

module.exports.profile = async function(req, res) {
    try {
        const shortUrls = await ShortUrl.find({ user: req.user._id }); 

        return res.render('profile', { shortUrls: shortUrls });
    } catch (err) {
        console.error("Error fetching shortUrls:", err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup', { title: "I am flying" });
}

module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signin', { title: "I am flying" });
}


module.exports.signout = function (req, res) {
    console.log('session-destroyed from signout sesson');

    req.logout(); // This function logs the user out if Passport.js is properly configured
    res.redirect('/'); // Change this URL to match your desired redirect destination
};


module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirmpassword) {
        return res.redirect('back');
    }
    try {
        const existingUser = await User.findOne({ email: req.body.email });
      
        if (!existingUser) {
          const newUser = await User.create(req.body);
          console.log('User created');
          return res.redirect('/users/signin');
        } else {
          return res.redirect('back');
        }
      } catch (err) {
        console.log('Error in finding or creating user:', err);
        return res.status(500).send('Internal Server Error');
      }   
}


module.exports.createSession = function(req, res) {
    console.log('session-started');
    return res.redirect('/users/profile');
}


module.exports.destroySession = function (req, res) {
    console.log('session-destroyed from destrou sesson');
    // req.logout();
    req.session.destroy(function(err) {
        if (err) {
            console.log('Error destroying session:', err);
        }
        return res.redirect('/');
    });
};


