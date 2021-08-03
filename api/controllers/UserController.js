const passport = require('passport');
const pool = require('../db.js').getConnection();
const db = require('../config/db.config.js');
const User = db.users;
const Save = db.save;
const crypto = require('crypto-random-string')
const { passwordHash, passwordVerify, } = require('nodejs-password');
var jwt = require('jsonwebtoken');

const KEY = "yvH7=Ia@V<=1JM~'vJ]Fh1aBK7*iYuWEqGx)T1VPi[M1R&kuiXN>;%]A9O&~1*q";

var userController = {};

userController.doRegister = async function(req, res) {
    let password = req.body.password;
    let email = req.body.email;

    if(!password || !email )
        return res.status(400).send('Parameters is missing')

    let salt = crypto({length: 18, type: 'base64'});
    let hash = await passwordHash(req.body.password, salt);
    let user = await User.create({
        email: email,
        password: hash,
        salt: salt
    }).catch(reason => {
        return res.status(400).json(reason.errors);
    });

    let jwtToken = await userController.generateJWT(user);

    return res.status(200).send(jwtToken);
};

userController.saveSession = async function (req,res,next) {
    let json = req.body.json;

    if(!json)
        return res.status(400).send('Parameters is missing')

    let sessionId = crypto({length: 16, type: 'alphanumeric'});

    await Save.create({
        sessionId: sessionId,
        userId: req.user.id,
        save: json
    })
    return res.status(200).json('session saved')
}

userController.getSession = async function (req,res,next) {
    let sessionId = req.body.sessionId;

    if(!sessionId)
        return res.status(400).send('Parameters is missing')


    let save = await Save.findOne({
        where: {sessionId: sessionId}
    })

    if (save) {
        res.status(200).send(save);
    } else {
        return res.status(404).json(`session not found`);
    }
}

userController.getAllUsers = function (req, res, next) {
    User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(customers => {
            res.json(customers);
        })
        .catch(error => res.status(400).send(error))
}

userController.findUserSalt = async function(email) {
    let user = await User.findOne({
        where: {email: email}
    }).catch(reason => {
        return false
    });
    return user.getDataValue('salt');
}


userController.doLogin = async function(req, res, next) {
    let salt = await userController.findUserSalt(req.body.email);
    if(!salt)
        return res.status(404).json(`User not found`);
    let hash = await passwordHash(req.body.password, salt);
    let user = await User.findOne({
        where: {email: req.body.email, password: hash}
    }).catch(reason => {
        return res.status(404).json(`User not found`);
    });

    if(!user){
        return res.status(404).json(`User not found`);
    }

    let jwtToken = await userController.generateJWT(user);
    res.status(200).send(jwtToken);
};

userController.verificationJWT = async function (req, res, next) {
    var str = req.get('Authorization');
    try {
        jwt.verify(str, KEY, {algorithm: 'HS256'});
        return true
    } catch {
        return false
    }
}

userController.deleteAccount = async function (req, res,next) {
    let user = await User.destroy({
        where: {id: req.user.id}
    }).catch(reason => {
        return res.status(404).json(`User not found`);
    });

    if(!user)
        return res.status(404).json(`User not found`);

    return res.status(200).json('User deleted');
}

userController.update = async function(req,res,next) {
    if(req.body.hasOwnProperty('password')){
        let salt = crypto({length: 18, type: 'base64'});
        req.body.password = await passwordHash(req.body.password, salt);
        req.body.salt = salt;
    }

    let user = await User.update(req.body, {where: {id: req.user.id}}).catch(err => {
        console.log(err);
        return res.status(500).json(err);
    })
    if(!user)
        return res.status(404).json(`User not found`);
    else{
        let updatedUser = await User.findOne({
            where: {id: req.user.id}
        });
        if(!updatedUser)
            return res.status(404).json('updated user not found');
        else{
            let jwtToken = await userController.generateJWT(updatedUser);
            return res.status(200).send(jwtToken);
        }
    }
}

userController.generateJWT = async function(user) {
    let payload = {
        id: user.getDataValue('id'),
        email: user.getDataValue('email')
    }
    return await jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "15d"})
}

userController.getRoutes = async function(req, res, next) {
    let routes = await Save.findAll({
        where: {userId: req.user.id}
    });

    if(!routes)
        return res.status(404).json('routes not found');
    else{
        return res.status(200).send(routes);
    }
}

userController.updatePassword = async function(req,res,next) {
    let password = req.body.password;
    if(!password)
        return res.status(403).send('Need new password value')

    let salt = crypto({length: 18, type: 'base64'});
    password = await passwordHash(password, salt);

    let user = await User.update({password: password, salt: salt}, {where: {id: req.user.id}}).catch(err => {
        console.log(err);
        return res.status(500).json(err);
    })
    if(!user)
        return res.status(404).json(`User not found`);
    else{
        let updatedUser = await User.findOne({
            where: {id: req.user.id}
        });
        if(!updatedUser)
            return res.status(404).json('updated user not found');
        else{
            let jwtToken = await userController.generateJWT(updatedUser);
            return res.status(200).send(jwtToken);
        }
    }
}

module.exports = userController;
