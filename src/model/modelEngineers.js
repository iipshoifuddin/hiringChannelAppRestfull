'use strict';
//const express = require ('express');
// const bodyParser = require ('body-parser');
const connection = require ('../../config/connect');
//const response = require ('./response');

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
        connection.query (`SELECT * FROM tb_engineers WHERE (name LIKE '%${s}%' OR skill LIKE '%${s}%') ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    countTbEngineers:(s,offset, limit, sort, sortBy) =>{
      return new Promise((resolve, reject) => {
        connection.query (`SELECT COUNT(*) as totalCount FROM tb_engineers where (name LIKE '%${s}%' OR skill LIKE '%${s}%')`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    getRecordByID:(id)=>{
      return new Promise((resolve, reject) => {
        connection.query (`SELECT * FROM tb_engineers WHERE id="${id}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    addRecord:(name, description, skill, location, dateofbrith, phonenumber, email, password, showcase, id) => {
      return new Promise((resolve, reject) => {
        connection.query (`INSERT INTO tb_engineers SET id="${id}", name="${name}", description="${description}", skill="${skill}", location="${location}", dateofbrith="${dateofbrith}", phonenumber="${phonenumber}", showcase="${showcase}", email="${email}", password="${password}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    },

    updateRecord:(name, description, skill, location, dateofbrith, phonenumber, email, password, showcase, id) => {
      return new Promise((resolve, reject) => {
        connection.query (`UPDATE tb_engineers SET name="${name}", description="${description}", skill="${skill}", location="${location}", dateofbrith="${dateofbrith}", phonenumber="${phonenumber}", showcase="${showcase}", email="${email}", password="${password}"  WHERE id="${id}"`, function (error, rows, fields,res) {
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
        connection.query (`DELETE FROM tb_engineers WHERE id="${id}"`, function (error, rows, fields,res) {
          if (!error) {
            resolve(rows);
          } else {
              reject(new Error(error));
          }
        });
      });
    }

    
};