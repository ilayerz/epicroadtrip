var express = require('express');
var router = express.Router();
var user = require("../controllers/UserController");
let JWTMiddleware = require("../middleware/JWT")


// route for register action
router.post('/register', user.doRegister);

// route for login action
router.post('/login', user.doLogin);

router.get('/all', user.getAllUsers);

router.delete('/delete', JWTMiddleware, user.deleteAccount)

router.put('/update', JWTMiddleware, user.update)

router.post('/updatePassword',JWTMiddleware, user.updatePassword)

router.post('/save',JWTMiddleware, user.saveSession)

router.post('/get/save', user.getSession)

router.get('/get/usersave', JWTMiddleware, user.getRoutes)


module.exports = router;