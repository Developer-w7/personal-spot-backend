const BookModel = require("../models/book");
const book= {
        "id": 1,
        "title": "Book One",
        "author": "Author One",
        "publishedYear": 2021
    }


const books=[
    {
        "id": 1,
        "title": "Book One",
        "author": "Author One",
        "publishedYear": 2021
    },
     {
        "id": 2,
        "title": "Book Two",
        "author": "Author Two",
        "publishedYear": 2020
    }]


exports.getAllBooks = (req,res)=>{
    return res.status(200).json(books);
}

exports.getBooksById =(req,res)=>{
    return res.status(200).json(book);
}