const express = require("express")
require('dotenv').config()
const ps = require("../prisma/connection")
const { jwt_sign } = require("../services/jwt_services")


const publisher = express.Router()

publisher.get("/publisher", async(req,res)=>{
    res.send("BERHASIL")
})

publisher.post("/publisher_create", async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.publisher.create({
            data : {
                name :  data.name
            }
        })

        if(!result){
            res.json({
                success : false,
                msg : "nama publisher sudah ada"
            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil buat publisher",
            query : result,
            token : jwt_sign({
                ...result,
                password : process.env.SECRET_KEY
            })
        })
    } catch (error) {
        res.json({
            success : false,
            msg : "nama publisher sudah ada",
            // error : error.message
        })
    }
})

publisher.get("/publisher_read_all", async(req,res)=>{
    try {
        const result = await ps.publisher.findMany({
            include : {
                books : true
            }
        })
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : erorr.message
        })
    }
})



module.exports = publisher