const express = require('express');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection ({
  user: 'root',
  password: ${{ secrets.GCLOUD_PASSWORD }},
  database: 'pages',
  socketPath: '/cloudsql/cloudcomputing3032:us-central1:codelab-0'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

app.get('/', (req, res) => {
  var output = {
    'error': false,
    'answer': 0
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var searchText = req.query.search;

  let query = "SELECT uri FROM page WHERE content LIKE ?";
  db.query(query, ['%' + searchText + '%'], (err, result) => {
    if (err) {
      output.error = err;
    }
    var uris =[];
    for (var i = 0; i < result.length; i++) {
      uris.push(result[i].uri)
    }
    output.answer = uris;
    res.end(JSON.stringify(output));
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port', port);
});
