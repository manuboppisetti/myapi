import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const res = await axios.get('http://localhost:5001/api/books', {
        headers: { Authorization: `Bearer ${token}` } // Include token in Authorization header
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const addBook = async (book) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const res = await axios.post('http://localhost:5001/api/books', book, {
        headers: { Authorization: `Bearer ${token}` } // Include token in Authorization header
      });
      setBooks([...books, res.data]);
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Include token in Authorization header
      });
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div>
      <h1>Book List</h1>
      <BookForm addBook={addBook} />
      {books.map(book => (
        <Book key={book._id} book={book} deleteBook={deleteBook} />
      ))}
    </div>
  );
};

export default BookList;
