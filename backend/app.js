const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todo =require('./models/todo');
const mongoose = require('mongoose');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,OPTIONS")
    next();
});

mongoose.connect('mongodb+srv://suraj_26:Suraj@1626@cluster0-raz4s.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongo db connected");
}).catch(()=>{
    console.log("mongodb not connected");
})


app.get("/api/todos",(req,res,next) =>{
  todo.find().limit(5).then(docs => {
      const todos = docs;
      console.log(todos);
      res.status(200).json({
          message: 'todos fetched successfully',
          todo:todos
      })

  }).catch(error =>{
      res.status(400).json({
          message: 'todos can not be fetched'
      })
  }) 
})

app.post('/api/createTodo',(req,res,next) => {
    const todoObj = new todo({
        name: req.body.name,
        address: req.body.address
    })
    console.log(todoObj);
    todoObj.save();
    res.status(201).json({
        message: 'Post added successfully.'
    })
  })
 app.put('/api/updatetodo/:id',(req,res,next)=>{
     let updateObj = {
         name: req.body.name,
         address: req.body.address
     }
     console.log(req.params.id)
     todo.findOneAndUpdate({_id: req.params.id},{$set: updateObj},(err,doc,resu) => {
         res.status(202).json({
             message: "Post updated successfully"
         })
     })
 })
 
 app.delete('/api/deletePost/:id',(req,res,next)=> {
     todo.deleteOne({_id: req.params.id}).then(()=>{
         res.status(203).json({
             message: "Post deleted successfully"
         })
     })
})

app.get('/api/search/:text',(req,res,next) =>{
     console.log(req.params.text);
     //for single coloum
    // todo.find({ name: { $regex: req.params.text, $options: "i" }}, function(err, docs) {
    //     console.log("Partial Search Begins");
    //     console.log(docs);
    //     let todos = docs;
    //     res.status(200).json({
    //        message: 'todos fetched successfully',
    //         todo: todos
    //     })
    // })
//for multiple coloum
    //var query = {$or:[{name:{$regex: req.params.text, $options: 'i'}},{address:{$regex: req.params.text, $options: 'i'}}]}

    todo.find({$or:[{name: { $regex: req.params.text, $options: 'i' }},
    {address: { $regex: req.params.text, $options: 'i' }}
] },
        function(err, docs){
     console.log(docs);
     let todos = docs;
     res.status(210).json({
         message: 'todo fetched successfully',
         todo: todos
     })
})
})

app.get("/api/next/:pageno",(req,res,next)=>{
            let num = 5 * req.params.pageno
            todo.find().skip(num).limit(5).then(docs => {
                const todos = docs;
                console.log(todos);
                res.status(200).json({
                    message: 'todos fetched successfully',
                    todo:todos
                })
          
            }).catch(error =>{
                res.status(400).json({
                    message: 'todos can not be fetched'
                })
            }) 
} )

app.get("/api/prev/:pageno",(req,res,next)=>{
    let num = 5 * req.params.pageno
    todo.find().skip(num).limit(5).then(docs => {
        const todos = docs;
        console.log(todos);
        res.status(200).json({
            message: 'todos fetched successfully',
            todo:todos
        })
  
    }).catch(error =>{
        res.status(400).json({
            message: 'todos can not be fetched'
        })
    }) 
})
module.exports = app;