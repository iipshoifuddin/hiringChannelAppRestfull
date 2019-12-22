'use strict';
const uuidv4 = require('uuid/v4');

exports.ok = function (values, res) {
  const data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end ();
};



// module.exports = {
//     response : (res, status) => {
//         let resultPrint = {};
//         resultPrint.id = uuidv4();
//         resultPrint.status = status || 200;
//         resultPrint.error = error || false;
//         resultPrint.message = message || 'Success!';
//         resultPrint.data = data || {};

//     return res.status(resultPrint.status).json(resultPrint);
//     }
// }