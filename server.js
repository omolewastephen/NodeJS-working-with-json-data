/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: ______________________ Student ID: ______________ Date: ________________
*
* Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express =   require('express');
var app =       express();
var path    =   require("path");

const dataService = require('./data-service.js');

app.use(express.static('public'));

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

app.get("/about", (req,res) =>{
    res.sendFile(path.join(__dirname+'/views/about.html'));
});

app.get("/managers", (req,res) =>{  
       dataService.getManagers().then(function(data){
        const managers = [];
        data.forEach((element) => {
            if(element.isManager == true){
                managers.push(element);
           }
        });
        res.json(managers);
       }).catch(function(err){
            var error = {"message": err };
            res.json(error);
       });  
});

app.get("/departments", (req,res) =>{
    dataService.getDepartments().then(function(data){
        res.json(data);
    }).catch(function(err){
        var error = {"message": err };
        res.json(error);
    });
});

app.get("/employees", (req,res) =>{
    dataService.getAllEmployees().then(function(data){  
        res.json(data);
    }).catch(function(err){
        var error = {"message": err };
        res.json(error);
    });
});

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname+'/views/404.html'));
});

dataService.initialize().then(function(){
    app.listen(HTTP_PORT,() => console.log('Express http server listening on port ' +HTTP_PORT));
}).catch(function(err){
    console.log('Error initializing app. No data found');
});
