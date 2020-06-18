const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

//const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    let user = new User();
    user.username = req.body.username; // UI of postman
    user.email = req.body.email;
    user.password = req.body.password;


    //const user = new User({ username: username});//, email: email

    await user.setPassword(user.password);
    await user.save().then(result => {
        console.log(result);
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, config.get('jwt.secret'));
        res.json({
            "status": "success",
            "data": {
                "token": token
            }
        })        
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {//req.body.email,  req.body.birthday,
        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed"
            })
        }
        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, config.get('jwt.secret'));
        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
}

module.exports.signup = signup;
module.exports.login = login;