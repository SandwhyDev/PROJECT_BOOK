const express = require('express');
const path = require('path');
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

module.exports = books