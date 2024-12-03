import React from 'react';

const Book = ({ book, deleteBook }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>${book.price}</p>
      <button onClick={() => deleteBook(book._id)}>Delete</button>
    </div>
  );
};

export default Book;
