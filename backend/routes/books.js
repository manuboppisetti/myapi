const express = require('express');
const { check, validationResult } = require('express-validator');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/',
  [
    check('title').isString().withMessage('Title must be a string'),
    check('author').isString().withMessage('Author must be a string'),
    check('description').isString().withMessage('Description must be a string'),
    check('price').isNumeric().withMessage('Price must be a number'),
    protect
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addBook(req, res);
  }
);

module.exports = router;
