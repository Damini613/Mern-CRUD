const express = require("express");

const router = express.Router();

// we need Book Model

const Note = require("../../models/Notes");


router.get("/all", async (req, res) => {
  try {
    const data = await Note.find();
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "no notes found" });
  }
});


router.get('/get/:id',async(req,res)=>{
  const _id = req.params.id
  try {
      const data = await Note.findById(_id)
     if(data){
      res.status(200).json(data)
     }else{
       res.status(400).json({error:'error occured'})
     }
    
  
      }
   catch (error) {
      res.status(500).json({error:'failed to send data'})
  }
})

router.post("/newNote", async (req, res) => {
  try {
    const note = new Note({
    name:req.body.name,
   description:req.body.description 
    });
    note.save();
    res.json({ message: "note added successfully" });
  } catch (error) {
    res.json({error:'failed to add note'});
    console.log(error);
  }
});

router.put('/update/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const data = await Note.findById(_id)
        if(data){
            const data2 = await Note.findByIdAndUpdate(_id,{
                name:req.body.name,
                description:req.body.description
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
        const data = await Note.findById(_id)
        if(data){
            const data2 = await Note.findByIdAndDelete(_id)
            res.status(200).json({message:'deleted successfully'})
            // res.status(200).json(data2)
        }
    } catch (error) {
        res.status(400).json({error:'failed to delete'})
    }
})

module.exports = router;
