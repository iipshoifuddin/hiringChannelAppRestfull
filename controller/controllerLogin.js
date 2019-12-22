'use strict';

//const express = require ('express');
const response = require ('./response');
const connection = require ('../config/connect');
const jwt = require('jsonwebtoken');
const private_key = process.env.SECRET_KEY;

exports.add = function (req, res) {
  
  //const payload = { username: 'john', email: 'john@gmail.com' };
  // get email and password from req.body
  // 1. check email REGEX
  const { email, password } = req.body;
  let emailFromDB = '';
  let idFromDB = '';

  connection.query (`SELECT id, email, privilegelevels FROM tb_companies WHERE email='${email}' AND password='${password}'  UNION SELECT  id, email, privilegelevels FROM tb_engineers WHERE  email ='${email}' AND password = '${password}'`, function (error, rows, fields) {

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
};


exports.secret = function (req, res) {
      // get header
      const { token, email, userid } = req.headers;
      //const userid = password;
      // check header for required headers
      if(!token || !email || !userid) {
          return res.status(404).json({ 
              message: 'Unauthorized!'
          })
      }
  
      // split to get real token
      //console.log(req.headers);
  
      // decode JWT and check for validity
      jwt.verify(token, private_key, (err, decoded) => {
          // check for invalid token
          if(err && err.name === 'JsonWebTokenError'){
              return res.status(403).json({ 
                  message: 'Invalid token!'
              })
          }
          
          // check for expired token
          if(err && err.name === 'TokenExpiredError') {
              return res.status(403).json({
                  message: 'Token expired!'
              })
          }
          
          // check if token is registered with correct email and userid
          if(email !== decoded.emailFromDB || userid !== String(decoded.idFromDB)) {
              return res.status(403).json({
                  message: 'Token not valid for selected id/email',
                  message2: 'hmmm, maling token lu yaa?!',
                })
              }

          // if valid then do next step
  
          res.json({ 
              msg: 'authorized'
          })
      })
};