var jwt = require('jsonwebtoken');


module.exports = {
    assignToken: (userId) => {
        return new Promise((resolve,reject)=>{
            const payload = {
                id: userId
            }
            const secret = process.env.SECRET;
            const options = {
                expiresIn: 3600
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if (err) return reject (err)
                console.log(token);
                return resolve(token);
            })
        });
    },
    assignRefToken: (userId) => {
        return new Promise((resolve,reject)=>{
            const payload = {
                id: userId
            }
            const secret = process.env.SECRET;
            const options = {
                expiresIn: 3700
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if (err) return reject (err)
                console.log(token);
                return resolve(token);
            })
        });
    },
    verifyToken: (req,res,next) => {

        var authorization = req.headers['authorization'];
    
        if (!authorization)
            return res.status(403).send({auth: false,message: "no token provided"});
        
        var token = authorization.split(' ')[1];    
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if (err) return res.status(500).send({auth:false,message:"Failed to authenticate"});
            console.log("Authenticated\n");
            req.userId = decoded.id;
            next();
        }); 
    }
        
    }