const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({

    name :{
        type:String,
        required:true
    },

    description : {

        type: String,
        required:true
    }


})

module.exports = mongoose.model('notes',NotesSchema)