const express = require('express');
const triangleBox = require('./boxTriangle');
const App = express();

const PORT = 8080;

App.use(express.json());

App.get("/cube", (req, res) => {
  // parse
  const width = parseFloat(req.query.width) || 10;
  const height = parseFloat(req.query.height) || 10;
  const length = parseFloat(req.query.length) || 10;
  // log
  console.log(`width=${width}; height=${height}; length=${length};`);
  // cors
  res.append('Access-Control-Allow-Origin', '*');
  // answer
  res.status(200).json({
    error: false,
    buffer: triangleBox(width, height, length)
  });
});


App.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port...`);
});
