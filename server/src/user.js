// Import Libraries
const bcrypt = require('bcrypt');
const User = require('../models/user');
const util = require('../util');

module.exports = {
    /** 
     * registers user to database
     * @param req request object
     * @param res response object
     */
    register(req,res){
        var data = req.body;
        console.log(data);
        const username = data.username;
        const password = data.password; 
        const password2 = data.password2;
        const email = data.email;

        // TODO: Validation
        //req.checkBody('username','Username field is required').notEmpty();
        //req.checkBody('password','Password field is required').notEmpty();
        //req.checkBody('password2','Passwords do not match').equals(password2);
        //req.checkBody('email','Email field is required').notEmpty();

        /*const errors = req.validationErrors();
        if(errors){
            util.logError('error during validation');
            console.log(errors);
            var resBody = {
                url: '/register'
            };
            res.json(resBody);
        }else{*/
            let newUser = new User({
                username:username,
                email:email, 
                password:password,
                createdOn: new Date().toISOString()
            });
            bcrypt.genSalt(10, function(err,salt){
                if(err){
                    util.logError('error during salt generation');
                    console.log(err);
                }
                bcrypt.hash(newUser.password, salt, function(err,hash){
                    if(err){
                        util.logError('error during hashing');
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function(error){
                        if(error){
                            console.log(error);
                            return;
                        }else{
                            var resBody = {
                                user:{
                                    id: newUser._id,
                                    username: newUser.username,
                                    password: newUser.password,
                                    createdOn: newUser.createdOn
                                },
                                statusCode: res.statusCode,
                            };
                            var token = util.generateToken(resBody);
                            console.log('Token: '+token);
                            res.status(200).send({body: resBody, token: token});
                        }
                    })
                });
            });
        //}
    },

    /** 
     * logs user in
     * @param req request object
     * @param res response object
     */
    login(req, res) {
        //req.checkBody('username','Username field is required').notEmpty();
        //req.checkBody('password','Password field is required').notEmpty();
        //var err = req.validationErrors();
        var resObj;

        console.log("login: ",req.body);
        req.logIn(req.body, function(err) {
            if (err) {
                util.logError(err)
                console.log(err);
                res.status = 500;
                resObj = {
                    message:"Cannot log you in"
                };
            }
            else{
                let user = {
                    id: req.body._id,
                    username: req.body.username
                }
                let token = util.generateToken(user);
                resObj = {
                    token: token,
                    user: user
                };
                util.logSuccess("Successful login");
            } 
            res.send(resObj);
        });
    },

    /** 
     * update a user in the db
     * @param req request object
     * @param res respomse object
     */
    updateUser(req,res){
        User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(user){
            User.findOne({_id: req.params.id}).then(function(user){
                res.send(user);
            });
        })
    },

    /** 
     * delete a user from the database
     * @param req request object
     * @param res respomse object
     */
    deleteUser(req,res,next){
        //console.log(req.params.id);
        User.findByIdAndRemove({
            _id: req.params.id
        }).then(function(user){
            res.send(user);
        });
    }
}