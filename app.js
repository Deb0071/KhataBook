const express = require("express");
const app=express();
const path=require("path");
const fs=require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({express: true}));
app.use(express.static(path.join(__dirname,"public")));



app.get('/', (req, res) => {
    fs.readdir(`./hisaab`,(err, data) => {
        if(err) return res.status(500).send(err.message);

        res.render("index.ejs",{data});
    });
});


app.get('/create', (req, res) => {
    res.render("create.ejs");
});

app.get('/edit/:filename', (req, res) => {
        fs.readFile(`./hisaab/${req.params.filename}`,"utf-8",(err, data) => {
        if (err) return res.status(500).send(err.message);

        res.render("edit.ejs",{data,filename:req.params.filename});

        });
});


app.get('/delete/:filename', (req, res) => {
    fs.unlink(`./hisaab/${req.params.filename}`,(err) => {
        if (err) return res.status(500).send(err.message);

        res.redirect("/");

    });
});

app.get('/hisaab/:filename', (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8",(err, data) => {
        if (err) return res.status(500).send(err.message);

        res.render("hisaab.ejs",{data,filename:req.params.filename});

    });
});


app.post('/update/:filename', (req, res) => {

    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content, (err)=>{
     if (err) return res.status(500).send(err.message);
     
       res.redirect("/"); 
     });
});


app.post('/createhisaab', (req, res) => {

    let currentdate=new Date();
    let date=`${currentdate.getDate()}-${currentdate.getMonth()}-${currentdate.getFullYear()}`;

    fs.writeFile(`./hisaab/${date}.txt`,req.body.content, (err)=>{
     if (err) return res.status(500).send(err.message);
       res.redirect("/"); 
     });
});





app.listen(3000, () => {
    console.log(`Server started on port ${3000}`);
});