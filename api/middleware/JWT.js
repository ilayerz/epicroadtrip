const jwt = require('jsonwebtoken');
const KEY = "yvH7=Ia@V<=1JM~'vJ]Fh1aBK7*iYuWEqGx)T1VPi[M1R&kuiXN>;%]A9O&~1*q";

function authenticateToken(req, res, next) {
    let authHeader = req.headers['authorization']
    if(!authHeader)
        return res.sendStatus(403)
    if(authHeader.split(' ')[0] == "Bearer")
        authHeader = authHeader.split(' ')[1]


    const token = authHeader && authHeader.split('.')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(authHeader, KEY, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next();
    })
}

module.exports = authenticateToken;