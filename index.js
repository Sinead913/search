'use strict';

const express = require('express');
let mysql = require('mysql');

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req,res) => {

  var output = {
    'error': false,
    'answer': 0
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    var searchText = req.query.search;

    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'todoapp'
    });

    let sql = `SELECT * FROM pages`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        output.error = error.message;
      }
      output.answer = results;
    });

    connection.end();
    res.end(JSON.stringify(output));
  } catch(e) {
    output.error = e;
    res.end(JSON.stringify(output));
  }
});

app.listen(PORT, HOST);
