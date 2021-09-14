import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

// index.html
/* app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
}); */

app.listen(port);
console.log('Server started at http://localhost:' + port);
