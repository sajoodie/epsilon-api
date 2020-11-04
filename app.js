"use strict";
var express = require('express'); //import express, because I want easier management of get and post requests.  
var bodyParser = require('body-parser'); //import body-parser, because I can't manage post data without it..
var MySql = require('sync-mysql');  //sync-mysql is used to create a synchronous database connection

//Database Connectivity
const options = {
  user: 'p12',
  password: '6VS02E',
  database: 'cherry',
  host: 'dataanalytics.temple.edu'
};

// create the connection
const connection = new MySql(options);

var app = express();  //the express method returns an instance of a app object
app.use(bodyParser.urlencoded({extended:false}));  //use this because incoming data is urlencoded

// CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();  //go process the next matching condition
});


//supporting functions go here
let commute = function(res, usertoken, miles, speed, location, destination){
	try{
	let txtSQL = "insert into commute(usertoken, miles, speed, location, destination) values (?,?,?,?,?)";
	connection.query(txtSQL,[usertoken, miles, speed, location, destination]);
	} catch(e){
	console.log(e);
	return;
}
};

let eimpact = function(res, usertoken, c02emissions, gas_saved, trees){
	try{
	let txtSQL = "insert into environmental_impact(usertoken, c02emissions, gas_saved, trees) values (?,?,?,?)";
	connection.query(txtSQL,[usertoken, c02emissions, gas_saved, trees]);
	} catch(e){
	console.log(e);
	return;
}
};

let himpact = function(res, usertoken, bmi, calories_lost){
	try{
	let txtSQL = "insert into environmental_impact(usertoken, bmi, calories_lost) values (?,?,?)";
	connection.query(txtSQL,[usertoken, bmi, calories_lost]);
	} catch(e){
	console.log(e);
	return;
}
};

//terminalWrite is the last supporting function to run.  It sends 
// output to the API consumer and ends the response.
// This is hard-coded to always send a json response.
var terminalWrite = function(res,Output,responseStatus){
    res.writeHead(responseStatus, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(Output));
    res.end();
};

//app event handlers go here
app.get('/', function(req, res) {
    //what to do if request has no route ... show instructions
    var message = [];
    message[0] = "Instructions go here.";
    message[1] = "More instructions go here.";
	terminalWrite(res,message,200);
});

//This piece of code creates the server  
//and listens for a request on a port
//we are also generating a console message once the 
//server is created
var server = app.listen(XXXX, function(){
    var port = server.address().port;
    console.log("The server is listening on port:" + port);
});
