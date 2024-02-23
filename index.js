const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = new express();
app.use(cors());
app.use(bodyParser.json());


let Student = require('./Student.model');

mongoose.connect("mongodb+srv://diyaaysha89:4EyYfg2IIfZ40QZ3@cluster0.gfrka70.mongodb.net/studentbase?retryWrites=true&w=majority&appName=Cluster0")
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Mongodb Connected Successfully!");
});

app.get("/", (req, res) => {
    console.log("Request received");
    res.json("Hell0 World");
});

app.get("/hi", (req, res) => {
    console.log(" hi Request received");
    res.json("welcome with nodemon");
});

app.get("/people", (req, res) => {
    console.log("request recieved");
    res.json([{ name: "diya", role: "student" },
    { name: "navya", role: "student" }]);
});

app.get("/students", async (req, res) => {
    console.log("student request recieved");
    let data = await Student.find().catch(err => {
        res.json("error loading data");
    });
    res.json(data);
    // res.json([{name:"diya",age:"20",department:"2021"},
    // {name:"navya",age:"19",department:"2023"}])
})


app.get('/student/:id',async(req,res)=>{
    let id=req.params.id;
    let data=await Student.findById(id).catch(err=>{
        res.json("error finding student")
    });
    if(!data){
        res.json("not found");
    }
    else{
        res.json(data);
    }
});


app.delete('/student/:id',async(req,res)=>{
    let id=req.params.id;
    await Student.findByIdAndDelete(id)
    .catch(err=>{
        res.json("error deleting person");
    })
    .then(()=>{
        res.json('deleted data')
    })
    });



app.post('/students', (req, res) => {
    console.log(req.body);
    let student = new Student(req.body);
    student.save().then(() => {
        res.json("saved successfully");
    }).catch(err => {
        res.json("error:" + err);
    });
});

// put function


app.listen("4000", () => {
    console.log("started server on 4000");
})

