const express =require('express');
const cors=require('cors')

const app=new express();
app.use(cors());

app.get("/",(req,res) =>{
    console.log("Request received");
    res.json("Hell0 World");
});

app.get("/hi",(req,res) =>{
    console.log(" hi Request received");
    res.json("welcome with nodemon");
});

app.get("/people",(req,res)=>{
    console.log("request recieved");
    res.json([{name:"diya",role:"student"},
    {name:"navya",role:"student"}]);
});

app.get("/students",(req,res)=> {
    console.log("student request recieved");
    res.json([{Username:"diya",Branch:20,Year:2021},
    {Username:"navya",Branch:19,Year:2023}])
})

app.post('\person', (req, res) => {
    console.log(req.body);
});


app.listen("4000",()=>{
    console.log("started server on 4000");
})

