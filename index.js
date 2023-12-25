const express = require('express');
const cookieParser = require('cookie-parser');
const app = express(); // Create an instance of Express
const http = require('http').Server(app);
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

// Connect to MongoDB
mongoose.connect('mongodb+srv://sunilmann29:Wraoflv2JUkDeARM@cluster0.kiezkcy.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'Social',
    secret: 'your_secret_here',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./router'));

http.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});



// wZbMjL5akOTr96Jh

// url_123
// abc123abc123

// mongodb+srv://sunilmann7:wZbMjL5akOTr96Jh@cluster0.z93qeli.mongodb.net/

// 1121ae2w12


// Wraoflv2JUkDeARM