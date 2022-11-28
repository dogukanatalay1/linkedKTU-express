const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');
const { getAll } = require('./services/base-service')

const app = express();
app.use(express.json())

app.use(cors(
  {
    origin: '*',
  },
));

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
