const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
