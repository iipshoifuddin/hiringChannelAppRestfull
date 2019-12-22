'use strict';
const uuidv4 = require('uuid/v4');

exports.ok = function (values, res) {
  const data = {
    status: 200,
    values: values,
  };
  res.json (data);
  res.end ();
};

