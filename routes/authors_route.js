const express = require('express');
const ps = require('../prisma/connection');

const authors = express.Router()

authors.post("/authors_create", async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.authors.create({
            data : {
                ...data
            }
        })
        res.json({
            success : true,
            msg : "berhasil buat author",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

authors.get("/auhtors_read", async(req,res)=>{
    try {
        const result = await ps.authors.findMany({
            include : {
                book_author : true
            }
        })
        res.json({
            success : true,
            // msg : "berhasil buat author",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

authors.put("/authors_update/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const findUser = await ps.authors.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!findUser){
            res.json({
                success : false,
                msg : "authors tidak ditemukan"
            })
            return
        }
        const result = await ps.authors.update({
            where : {
                id : parseInt(id)
            },
            data : {
                ...data
            }
        })
        res.json({
            success : true,
            msg : "berhasil update",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

authors.delete("/authors_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const findUser = await ps.authors.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!findUser){
            res.json({
                success : false,
                msg : "author tidak ditemukan"
            })
            return
        }

        const result = await ps.authors.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil hapus data",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        }) 
    }
})

module.exports = authors