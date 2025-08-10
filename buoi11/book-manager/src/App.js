import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem("books");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const [editingBook, setEditingBook] = useState(null);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updateBook) => {
    const newList = books.map((b) => (b.id === updateBook.id ? updateBook : b));
    setBooks(newList);
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleDeleteClick = (id) => {
    const newList = books.filter((b) => b.id !== id);
    setBooks(newList);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Quản lý sách</h1>
      <BookForm
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editingBook={editingBook}
      ></BookForm>
      <BookList
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      ></BookList>
    </div>
  );
}

export default App;
