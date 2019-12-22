'use strict';

//const express = require ('express');
const response = require ('./response');
const connection = require ('./connect');
const mime = require('mime');
const uuid = require('uuid/v5');

//const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const path = require('path');

//const app = express ();
//var app = express();

// use token
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

//exports.add = upload.single('avatar');
exports.add = function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    //file Size
    const size = 0.2 * 1024 * 1024;
    if(req.files.engineersShowcase.size > size)
    {
        return res.status(405).send({
          status : 405,
          error: false,
          message: 'File Size Not Allowed !',
        });
    }    

    const myExt = mime.getType(req.files.engineersShowcase.name);
    if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
    {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const sampleFile = req.files.engineersShowcase;
        //console.log(req.files.foo); 
        const filename = req.files.engineersShowcase.name;
        // Use the mv() method to place the file somewhere on your server
        
        sampleFile.mv(`uploads//${filename}`, function(err) {
            if (err)
            //res.setHeader('Content-Type', 'application/json');  
            return res.status(500).send(err);

          
          //res.send('File uploaded!');
        //  response.ok (rows, res);
        });
              
        const name = req.body.name;
        const description = req.body.description;
        const skill = req.body.skill;
        const location = req.body.location;
        const dateofbrith = req.body.dateofbrith;
        const phonenumber = req.body.phonenumber;
        const email = req.body.email;
        const password = req.body.password;        

        const showcase = filename;
        const id = uuid(`${name}+${dateofbrith}`,MY_NAMESPACE);

        // query insert
        connection.query (
        `INSERT INTO tb_engineers SET id="${id}", name="${name}", description="${description}", skill="${skill}", location="${location}", dateofbrith="${dateofbrith}", phonenumber="${phonenumber}", showcase="${showcase}", email="${email}", password="${password}"`,
          function (error, rows, fields) {
            if (error) {
              throw error;
            } else {
                
            const token = jwt.sign({
                emailFromDB,
                idFromDB
                }, 
                private_key,
                {
                    expiresIn: '1h'
                });
        
                res.status(201).json({
                status: 201,
                message: 'Success login!',
                token,
                user: {
                    email,
                    userId:idFromDB
                }
            });


              return res.send ({
                error: false,
                data: rows,
                message: 'New data has been created',
              });
            }
          }
        ); 

        connection.query (`INSERT INTO tb_engineers SET id="${id}", name="${name}", description="${description}", skill="${skill}", location="${location}", dateofbrith="${dateofbrith}", phonenumber="${phonenumber}", showcase="${showcase}", email="${email}", password="${password}"`, function (error, rows, fields) {

          if (error) {
            //console.log (error);
            throw error;
          } 
          if(rows.length <= 0)
          {
            return res.status(400).send({
              status : 100,
              error: false,
              message: 'email and Password not Found in our database.',
            });
          }
      
          rows.forEach((row) => {
              emailFromDB = row.email;
              idFromDB = row.id;
              console.log(idFromDB);
      
              //Create a JSON Web Token (JWT)
              const token = jwt.sign({
                emailFromDB,
                idFromDB
                }, 
                private_key,
                {
                    expiresIn: '5s'
              });
      
              res.status(201).json({
                status: 201,
                message: 'Success login!',
                token,
                user: {
                    email,
                    userId:idFromDB
                }
          });
              
      
          });  
          //response.ok (rows, res);
          
        });

    }
    else
    {
      return res.status(405).send({
        status : 405,
        error: false,
        message: 'File Type Not Allowed !',
      });
    }
};


