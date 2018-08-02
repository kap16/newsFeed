const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const util = require('./util');
const User = require('./models/user');

module.exports = function(passport){
    // local strategy
    passport.use(new LocalStrategy({ passReqToCallback: true },
        function(req, username, password, done){
            // Match username
            let query = {username:username};
            User.findOne(query, function(err, user){
                if(err) util.logError(err);
                if(!user){
                    util.logError("No user found");
                    return done(null, false, {message: 'No user found'})
                }

                // match password
                bcrypt.compare(password, user.password, function(err, isMatch){
                    if(err) util.logError(err);
                    if(isMatch){
                        util.logSuccess("matched");
                        return done(null, user);
                    } else {
                        util.logError("didn't match");
                        return done(null, false, {message: 'Wrong password'})
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}