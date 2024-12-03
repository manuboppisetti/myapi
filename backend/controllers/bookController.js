const express = require('express');
const { check, validationResult } = require('express-validator');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.get('/', getBooks);

router.get('/:id', getBookById, (req, res) => {
  res.json(res.book);
});

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

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price
    });

    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.put(
  '/:id',
  [
    check('title').optional().isString().withMessage('Title must be a string'),
    check('author').optional().isString().withMessage('Author must be a string'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('price').optional().isNumeric().withMessage('Price must be a number'),
    protect
  ],
  getBookById,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, description, price } = req.body;

    if (title != null) res.book.title = title;
    if (author != null) res.book.author = author;
    if (description != null) res.book.description = description;
    if (price != null) res.book.price = price;

    try {
      const updatedBook = await res.book.save();
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.delete('/:id', protect, getBookById, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
