const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let app = express();

app.use(express.static(publicPath, {}))





app.listen(PORT, ()=> {
  console.log('Serving on port: ' + PORT);
});