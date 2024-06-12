const mongoose=require('mongoose')

const NoteSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String},
    createdAt:{type:Date,default:Date.now}
})

const Note=mongoose.model('note',NoteSchema)
module.exports=Note