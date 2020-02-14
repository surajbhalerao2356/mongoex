const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    name:{type: String, required:true, default: "hello"},
    address: {type:String, required:true, default:"hello"},
});

module.exports= mongoose.model('todo', todoSchema);