'use strict';

//const express = require ('express');
const response = require ('./response');
const connection = require ('../config/connect');
const mime = require('mime');
const uuid = require('uuid/v5');

//const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const path = require('path');

//const app = express ();
//var app = express();

// use token
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

exports.users = function (req, res) {

  let sql = '';
  const page = req.params.page;
  const page_awal = (page *5)-5;
  if(req.params.user==='engineers')
  {

      sql = `SELECT name, location, description, skill, phonenumber, email FROM tb_engineers ORDER BY date_updated DESC limit ${page_awal},5`;
  }

  if(req.params.user==='companies')
  {

      sql = `SELECT name, location, description, phonenumber, email FROM tb_companies limit ${page_awal},5`;
  }
  
  connection.query (sql, function (error, rows, fields) {
    if (error) {
      console.log (error);
    } else {
      response.ok (rows, res);
    }
  });
  
};

exports.welcome = function (req, res) {
  response.ok ('Welcome!', res);
};

exports.user = function (req, res) {
  connection.query (`SELECT * FROM tb_engineers WHERE id=${req.params.id}`, function (error, rows, fields) {
    if (error) {
      console.log (error);
    } else {
      response.ok (rows, res);
    }
  });
};

//exports.add = upload.single('avatar');
exports.add = function (req, res) {
      
        const emailSender = req.body.emailSender;
        const emailReceiver = req.body.emailReceiver;
        const message = req.body.message;
        
        if(req.files.engineersShowcase.size > size)
        {
          return res.status(405).send({
            status : 405,
            error: false,
            message: 'File Size Not Allowed !',
          });
        }  

        let sql = `SELECT tb_engineers.email , tb_companies.email FROM tb_engineers,tb_companies WHERE (tb_engineers.email='${emailSender}' AND tb_companies.email='${emailReceiver}') OR (tb_companies.email='${emailSender}' AND tb_engineers.email='${emailReceiver}')`;
        if(1)
        {
        
          connection.query (sql, function (error, rows, fields) {
            if (error) {
              console.log (error);
            } 
          });
        }
       // if(emailSender!==null && emailReceiver!==null)
        //{
      
        //    sql = `SELECT name, location, description, phonenumber, email FROM tb_companies limit ${page_awal},5`;
        //}

        // query insert
        const id = uuid(`${emailSender}+${emailReceiver}`,MY_NAMESPACE);
        connection.query (
        `INSERT INTO chat SET id="${id}", sender="${emailSender}", receiver="${emailReceiver}", message="${message}" `,
          function (error, rows, fields) {
            if (error) {
              throw error;
            } else {
              return res.send ({
                error: false,
                data: rows,
                message: 'New data has been created',
              });
            }
          }
        ); 
};



