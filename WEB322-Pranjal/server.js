/*********************************************************************************
 *  WEB322 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 * 
 * Name:  Pranjal 
 * Student ID:  165020215
 * Date: 2-3-2023
 *
 *  Cyclic Web App URL:    
 *
 *  GitHub Repository URL:  https://github.com/pranjalbhola/WEB322-Pranjal   
 *
 ********************************************************************************/


var express = require('express')
var data = require('./blog-service')
var app = express()
const fs = require('fs');
process.env.PWD = process.cwd()
const bodyparser = require('body-parser');
app.use(express.static('public'))
app.use(bodyparser.json());

var PORT = process.env.PORT || 8080



app.use(express.static(process.env.PWD + '/public'));


app.get("/", (req, res) => { res.redirect("/about"); });

app.get("/about", (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});


app.get("/blog", (req, res) => {
    data.getPublishedPosts().then(data => {
            res.send(data);

        })
        .catch(err => {
            res.send("No posts Found !");
        })

});
app.get("/posts", (req, res) => {
    data.getallPosts().then(data => {
            res.send(data);

        })
        .catch(err => {
            res.send("Can not Fetch data");
        })
});
app.get("/categories", (req, res) => {
    data.getCategories().then(data => {
            res.send(data);

        })
        .catch(err => {
            res.send("can not Fetch results !! ");
        })
});

app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile('./views/pageNotFound.html', { root: __dirname });
        return;
    }
});


data.initialize().then(() => {
        app.listen(PORT, () => {
            console.log(`Startiinng  ..... !!!    App is listening on port Number ${PORT}`)
        })
    })
    .catch(err => {
        console.log("Sorryyy !!!  Can not start App");
        console.log(err)
    });