const express = require('express');
const path = require('path');
const fs = require("fs")
const ps = require('../prisma/connection');
const book_uploads = require('../services/book_services');

const books = express.Router()

books.post("/books_create",book_uploads.single("book") ,async(req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.books.create({
            data : {
                tittle : data.tittle,
                total_pages : parseInt(data.total_pages),
                filename : file.originalname,
                book_path : path.join(__dirname, `../static/books/uploads/${file.filename}`),
                publisher_id : parseInt(data.publisher_id)
            }
        })
        if(!result){
            res.json({
                success : false,
                msg : "tittle sudah ada",
            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil upload buku",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

books.get("/books_read_all", async(req,res)=>{
    try {
        const result = await ps.books.findMany()
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

books.put("/books_update/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const find_book = await ps.books.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!find_book){
            res.json({
                success : false,
                msg : "data tidak ditemukan"
            })
            return
        }

        const result = await ps.books.update({
            where : {
                id : parseInt(id)
            },
            data : {
                tittle : data.tittle,
                total_pages : parseInt(data.total_pages),
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

books.delete("/books_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        // const data = await req.body
        const find_book = await ps.books.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!find_book){
            res.json({
                success : false,
                msg : "data tidak ditemukan"
            })
            return
        }
        const result = await ps.books.delete({
            where : {
                id : parseInt(id)
            }
        })

        const deletefs = await fs.unlinkSync(path.join(__dirname, `../static/books/uploads/${result.filename}`))

        res.json({
            success : true,
            msg : "berhasil delete data",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})
module.exports = books