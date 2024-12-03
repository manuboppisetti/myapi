const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

dotenv.config();
connectDB(); // Connect to the database

const app = express();
app.use(cors());
app.use(requestLogger); // Log every request

app.use(express.json());

app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(errorHandler); // Error handling middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
