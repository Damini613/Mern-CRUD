const express = require("express");

const router = express.Router();

// we need Book Model

const Book = require("../../models/Book");

router.get("/test", (req, res) => {
  res.json("book router testing");
});

router.get("/all", async (req, res) => {
  try {
    const data = await Book.find();
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "no books found" });
  }
});

router.post("/books", async (req, res) => {
  try {
    const book = new Book({
    title:req.body.title,
   isbn:req.body.isbn ,
    author:req.body.author ,
    publishedDate:req.body.publishedDate , 
    updated_date:req.body.updated_date 
    });
    book.save();
    res.json({ message: "book added successfully" });
  } catch (error) {
    res.json({error:'failed to add book'});
    console.log(error);
  }
});

router.put('/book/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const data = await Book.findById(_id)
        if(data){
            const data2 = await Book.findByIdAndUpdate(_id,{
                title:req.body.title
            })

            res.status(200).json({message:'updated successfully'})
        }
    } catch (error) {
        res.status(400).json({error:'failed to update'})
    }
})

router.delete('/drop/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const data = await Book.findById(_id)
        if(data){
            const data2 = await Book.findByIdAndDelete(_id)
            res.status(200).json({message:'deleted successfully'})
        }
    } catch (error) {
        res.status(400).json({error:'failed to delete'})
    }
})

module.exports = router;
