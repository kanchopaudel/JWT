var jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    var token = req.headers['x-access-token'];

    if (!token)
        return res.status(403).send({auth: false,message: "no token provided"});

    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if (err) return res.status(500).send({auth:false,message:"Failed to authenticate"});
        console.log("Authenticated\n");
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;