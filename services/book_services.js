const multer = require('multer');
const path = require('path');

const book_storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, `../static/books/uploads`))
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})

const book_uploads = multer({storage : book_storage})

module.exports = book_uploads