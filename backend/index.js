const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend origin
}));

// Your routes and middleware
