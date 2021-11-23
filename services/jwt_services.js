const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwt_sign = (payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verify_jwt = async (req,res,next)=>{
    try {
        let auth_header = await req.headers["authorization"]

        if(!auth_header){
            res.json({
                success : false,
                msg : "authorization tidak ada"
            })
            return
        }

        let token = await auth_header.split(" ")[1]
        let cek_token = await jwt.verify(token, process.env.SECRET_KEY)

        if(!cek_token){
            res.json({
                success : false,
                msg : "jwt salah"
            })
            return
        }

        next()
    } catch (error) {
        res.json({
            success : false,
            msg : "jwt salah"
        })
    }
}

