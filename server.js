const express = require('express');
const v1Router = require('./routes/index');

const connectToDB = require('./config/db');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

connectToDB();

app.use(express.json());

app.use('/api/v1', v1Router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
