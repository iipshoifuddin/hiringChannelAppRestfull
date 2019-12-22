//definition of dependencies 
const express = require ('express');
const bodyParser = require ('body-parser');
//const path = require('path');
const fileUpload = require('express-fileupload');
//const mime = require('mime/Mime');
//const uuid = require('uuid/v5');
//const JWT = require('jsonwebtoken');

//use defendencies of express
const app = express (),
dotenv = require('dotenv').config();


// USE CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});



//hash UUID V5
//const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

//console.log(uuid('Morgenstern Gesundkost', MY_NAMESPACE));

// 404 not found


//routes
const routes = require ('./routes/routes');

//use body parser
app.use(bodyParser.json ());
app.use (
  bodyParser.urlencoded ({
    extended: true,
  })
);

// use CORS


//Port USE
app.listen(process.env.PORT,function()
{
    console.log('server is running on port '+process.env.PORT+' !');
});

// use upload
app.use(fileUpload());


routes (app);

// 404 NOT FOUND
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/


/*
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  //console.log(req.files.foo); 
  const filename = req.files.sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  
  sampleFile.mv(`uploads//${filename}`, function(err) {
    if (err)
      return res.status(500).send(err);
    
    res.send('File uploaded!');
  });

});
*/