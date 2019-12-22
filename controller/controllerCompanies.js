'use strict';

//const express = require ('express');
const response = require ('./response');
const connection = require ('../config/connect');
const mime = require('mime');
const FileTypeFilter = require('file-type-filter')
const uuid = require('uuid/v5');
// Create a filter that allows only JPEGs to pass
const filter = new FileTypeFilter('image/jpeg')
//const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const path = require('path');

//const app = express ();
//var app = express();

//Import Model
const moldelCompanies = require('../src/model/modelCompanies');

// use token
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';




exports.users = function (req, res) {
    moldelCompanies.allJobs()
    .then(rows => {
          return res.send({
            error: false,
            data: rows,
            message: 'Data has showed',
          });
      //console.log(values);
    })
    .catch(err =>{
           console.log(err);
    }); 
};



// exports.user = function (req, res) {
//   connection.query (`SELECT * FROM tb_companies WHERE id=${req.params.id}`, function (error, rows, fields) {
//     if (error) {
//       console.log (error);
//     } else {
//       response.ok (rows, res);
//     }
//   });
// };

//exports.add 
exports.add = function (req, res) {

  //filter extenstion of file
 // const myExt = mime.getType(req.files.companyLogo.name);
 // if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
  //{

  //detect the file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            status : 404,
            error: false,
            message: 'No files were uploaded.',
          });
    }
    //file Size
    const size = 0.2 * 1024 * 1024;
    if(req.files.logo.size > size)
    {
      return res.status(405).send({
        status : 405,
        error: false,
        message: 'File Size Not Allowed !',
      });
    }    

    //filter extenstion of file
    const myExt = mime.getType(req.files.logo.name);
    if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
    {

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const sampleFile = req.files.logo;
        //console.log(req.files.foo); 
        const filename = req.files.logo.name;
        // Use the mv() method to place the file somewhere on your server
        
        sampleFile.mv(`public//images//logos//${filename}`, function(err) {
            if (err)
              return res.status(500).send(err);
          
          //res.send('File uploaded!');
        //  response.ok (rows, res);
        });
        
        
        //const id = req.body.id;
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const logo = filename;
        const phonenumber = req.body.phonenumber;
        const email = req.body.email;
        const password = req.body.password;   
        const id = uuid(name, MY_NAMESPACE);

        moldelCompanies.addRecord(name, location, description, logo, phonenumber, email, password, id)
        .then(rows => {
          return res.send({
            error: false,
            data: rows,
            message: 'New data has been created',
          });
            //console.log(values);
          })
          .catch(err =>{
              console.log(err);
          }); 

        // // query insert
        // connection.query (
        //   `INSERT INTO tb_companies SET id="${id}", name="${name}", logo="${logo}", location="${location}", description="${description}", phonenumber="${phonenumber}", email="${email}", password="${password}"`,
        //   function (error, rows, fields) {
        //     if (error) {
        //       throw error;
        //     } else {
        //       return res.send ({
        //         error: false,
        //         data: rows,
        //         message: 'New data has been created',
        //       });
        //     }
        //   }
        // );  
        
    }
    else
    {
      return res.status(405).send({
        status : 405,
        error: false,
        message: 'File Not Allowed !',
      });
    }
    
};

exports.update = function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            status : 404,
            error: false,
            message: 'No files were uploaded.',
          });
    }

    //file Size Filter
    const size = 0.2 * 1024 * 1024;
    if(req.files.logo.size > size)
    {
      return res.status(405).send({
        status : 405,
        error: false,
        message: 'File Size Not Allowed !',
      });
    }    


    //file Type Filter
    const myExt = mime.getType(req.files.logo.name);
    if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
    {

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const sampleFile = req.files.logo;
      //console.log(req.files.foo); 
      const filename = req.files.logo.name;
      // Use the mv() method to place the file somewhere on your server
      
      sampleFile.mv(`public//images//logos//${filename}`, function(err) {
          if (err)
            return res.status(500).send(err);
        
        //res.send('File uploaded!');
      //  response.ok (rows, res);
      });
      
      const id = req.params.id;
      const name = req.body.name;
      const location = req.body.location;
      const description = req.body.description;
      const phonenumber = req.body.phonenumber;
      const email = req.body.email;
      const password = req.body.password;  
      const logo = filename;

     

      // connection.query (
      // `UPDATE tb_companies SET name="${name}", logo="${logo}", location="${location}", description="${description}", phonenumber="${phonenumber}", email="${email}", password="${password}" WHERE id="${id}"`,
      // function (error, rows, fields) {
      //   if (error) {
      //     throw error;
      //   } else {
      //     return res.send ({
      //       error: false,
      //       data: rows,
      //       message: 'Data has been Changed',
      //     });
      //   }
      // });
      moldelCompanies.updateRecord(name, location, description, logo, phonenumber, email, password, id)
      .then(rows => {
        return res.send({
          error: false,
          data: rows,
          message: 'Data has been changed !',
        });
          //console.log(values);
        })
        .catch(err =>{
            console.log(err);
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

exports.destroy = function (req, res) {

  let id = req.params.id;
  moldelCompanies.deleteRecord(id)
  .then(rows => {
    return res.send({
      error: false,
      data: rows,
      message: 'Data has been Deleted !',
    });
    //console.log(values);
  })
  .catch(err =>{
      console.log(err);
  }); 
  // let id = req.params.id;
  // connection.query (`DELETE FROM tb_companies WHERE id=${id}`, function (error, rows, field) {
  //   if (error) {
  //     throw error;
  //   } else {
  //     return res.send ({
  //       error: false,
  //       data: rows,
  //       message: 'Data has been deleted.',
  //     });
  //   }
  // });
};