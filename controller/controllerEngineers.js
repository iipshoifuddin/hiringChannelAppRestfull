'use strict';
require('dotenv/config')
const port = process.env.PORT
const base_url = process.env.BASE_URL
//const express = require ('express');
const response = require ('./misc');
const connection = require ('../config/connect');
const mime = require('mime');
const uuid = require('uuid/v5');


//Import Model
const modelEngineer = require('../src/model/modelEngineers');
//const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const path = require('path');

//const app = express ();
//var app = express();

// use token
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

exports.users = function (req, res) {
    const s = req.query.s ? req.query.s : '' ;// to get query param '?'
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const sort = req.query.sort ? req.query.sort : 'DESC';
    const sortBy = req.query.sortBy ? req.query.sortBy : 'date_updated';
    const offset = (page*limit)-limit;

    let a ='';
    let totalPage
    modelEngineer.countTbEngineers(s,offset,limit,sort,sortBy).then(rows =>{
      a = rows[0].totalCount
    } );


    
   
    modelEngineer.allJobs(s,offset,limit,sort,sortBy)
    .then(rows => {
         
          
      // console.log(page)
      totalPage = Math.ceil(a / limit)
          const prevPage =
          page <= 1 ? '' : `${base_url}:${port}${req.originalUrl.replace(
                'page=' + page,
                'page=' + (parseInt(page) - 1)
              )}`

          const nextPage =
          page >= totalPage
            ? ''
            : `${base_url}:${port}${req.originalUrl.replace(
                'page=' + page,
                'page=' + (parseInt(page) + 1)
              )}`

              const results = {
                search: s,
                totalPage,
                totalData:a,
                page,
                limit,
                order: sortBy,
                sort,prevPage,
                nextPage
              }

              return response.response(
                res,
                200,
                false,
                'Success Get All data!',
                {results,rows}
              );


    })
    .catch(err =>{
        //console.log(err);
        throw(err);
    }); 
};



exports.user = function (req, res) {
  const id = req.params.id;

  modelEngineer.getRecordByID(id)          
  .then(rows => {
    return response.response(
      res,
      200,
      false,
      'Success Get All data!',
      {rows}
    );
//console.log(values);
    })
    .catch(err =>{
      throw(err);
      console.log(err);
    }); 

};

//exports.add = upload.single('avatar');
exports.add = function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return response.response(
        res,
        400,
        false,
        'No files were uploaded.',
        );
    }
    //file Size
    const size = 0.2 * 1024 * 1024;
    if(req.files.showcase.size > size)
    {
        return response.response(
          res,
          405,
          false,
          'File Size Not Allowed',
          );
    }    

    const myExt = mime.getType(req.files.showcase.name);
    if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
    {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const sampleFile = req.files.showcase;
        //console.log(req.files.foo); 
        const filename = uuid(`${req.files.showcase.name}+${req.body.email}`,MY_NAMESPACE);
        // Use the mv() method to place the file somewhere on your server
        console.log(sampleFile);
        sampleFile.mv(`public//images//${filename}.jpg`, function(err) {
            if (err){
            //res.setHeader('Content-Type', 'application/json');  
            //return res.status(500).send(err);
            return response.response(
                res,
                500,
                false,
                'Internal Server Error',
                err

            );}

          
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
        const id = uuid(`${name}+${email}`,MY_NAMESPACE);

        modelEngineer.addRecord(name, description, skill, location, dateofbrith, phonenumber, email, password, showcase, id)
          .then(rows => {
            return response.response(
              res,
              200,
              false,
              'New data has been Created. !'
            );

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

exports.update = function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  //file Size Filter
  const size = 0.2 * 1024 * 1024;
  if(req.files.showcase.size > size)
  {
    return res.status(405).send({
      status : 405,
      error: false,
      message: 'File Size Not Allowed !',
    });
  }    
  const myExt = mime.getType(req.files.showcase.name);
  if(myExt == "image/jpeg" || myExt == "image/png" || myExt == "image/jpg" ) 
  {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const sampleFile = req.files.showcase;
      //console.log(req.files.foo); 
      const filename = req.files.showcase.name;
      // Use the mv() method to place the file somewhere on your server
      
      sampleFile.mv(`public//images//${filename}`, function(err) {
          if (err)
            return res.status(500).send(err);
        
        //res.send('File uploaded!');
      //  response.ok (rows, res);
      });
      
      
      const id = req.params.id;
      const name = req.body.name;
      const description = req.body.description;
      const skill = req.body.skill;
      const location = req.body.location;
      const dateofbrith = req.body.dateofbrith;
      const phonenumber = req.body.phonenumber;
      const email = req.body.email;
      const password = req.body.password;  
      const showcase = filename;

      // connection.query (
      //   `UPDATE tb_engineers SET name="${name}", description="${description}", skill="${skill}", location="${location}", dateofbrith="${dateofbrith}", phonenumber="${phonenumber}", showcase="${showcase}", email="${email}", password="${password}"  WHERE id="${id}"`,
      //   function (error, rows, fields) {
      //     if (error) {
      //       throw error;
      //     } else {
      //       return res.send ({
      //         error: false,
      //         data: rows,
      //         message: 'Data has been Changed',
      //       });
      //     }
      //   }
      // );

      modelEngineer.updateRecord(name, description, skill, location, dateofbrith, phonenumber, email, password, showcase, id)
      .then(rows => {
        return res.send({
          error: false,
          data: rows,
          message: 'Data has been Changed !',
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
        modelEngineer.deleteRecord(id)
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

  // connection.query (`DELETE FROM tb_engineers WHERE id="${id}"`, function (error, rows, field) {
  //   if (error) {
  //     throw error;
  //   } else {
  //     return res.send ({
  //       error: false,
  //       data: rows,
  //       message: 'New data has been deleted.',
  //     });
  //   }
  // });
};

