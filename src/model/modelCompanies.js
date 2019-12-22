'use strict';
//const express = require ('express');
// const bodyParser = require ('body-parser');
const connection = require ('../../config/connect');
const response = require ('./response');

//const uuidv4 = require('uuid/v4');
//const app = express (),

module.exports = {
    // app.use(bodyParser.json ());
    // app.use (
    //     bodyParser.urlencoded ({
    // extended: true,
    //     })    //     );
    allJobs: (s, offset, limit, sort, sortBy) => {
      return new Promise((resolve, reject) => {
        connection.query (`SELECT * FROM tb_companies`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    addRecord:(name, location, description, logo, phonenumber, email, password, id) => {
      return new Promise((resolve, reject) => {
        connection.query (`INSERT INTO tb_companies SET id="${id}", name="${name}", logo="${logo}", location="${location}", description="${description}", phonenumber="${phonenumber}", email="${email}", password="${password}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    updateRecord:(name, location, description, logo, phonenumber, email, password, id) => {
      return new Promise((resolve, reject) => {
        connection.query (`UPDATE tb_companies SET name="${name}", logo="${logo}", location="${location}", description="${description}", phonenumber="${phonenumber}", email="${email}", password="${password}" WHERE id="${id}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    deleteRecord:(id) => {
      return new Promise((resolve, reject) => {
        connection.query (`DELETE FROM tb_companies WHERE id="${id}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    }   
};