const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json())

app.use(cors(
  {
    origin: '*',
  },
));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('welcome');
});

app.use('/students', routes.student);
app.use('/lecturers', routes.lectuter);
app.use('/employers', routes.employer);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
