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


module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirmpassword) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (err) {
            console.log('Error in finding user in signing up');
            return;
        }

        if (!existingUser) {
            User.create(req.body, function(err, newUser) {
                if (err) {
                    console.log('Error in creating user while signing up');
                    return;
                }
                console.log('user-created');
                return res.redirect('/users/signin');
            });
        } else {
            return res.redirect('back');
        }
    });
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


