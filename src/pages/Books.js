import React from "react";

function Books({ books, setBooks, currentUser }) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [isbn, setIsbn] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const [editingId, setEditingId] = React.useState(null);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
    setEditingId(null);
  };

  const saveBook = () => {
    if (
      title === "" ||
      author === "" ||
      genre === "" ||
      isbn === "" ||
      quantity === ""
    ) {
      alert("Please fill in all book fields.");
      return;
    }

    if (Number(quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    if (editingId) {
      const updatedBooks = books.map((book) => {
        if (book.id === editingId) {
          return {
            ...book,
            title,
            author,
            genre,
            isbn,
            quantity: Number(quantity)
          };
        }

        return book;
      });

      setBooks(updatedBooks);
      alert("Book updated successfully.");
    } else {
      const newBook = {
        id:
          books.length > 0
            ? Math.max(...books.map((book) => book.id)) + 1
            : 1,
        title,
        author,
        genre,
        isbn,
        quantity: Number(quantity)
      };

      setBooks([...books, newBook]);
      alert("Book added successfully.");
    }

    clearForm();
  };

  const editBook = (book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQuantity(book.quantity);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteBook = (id) => {
    const book = books.find((item) => item.id === id);

    if (book.quantity > 0) {
      alert(
        "This book still has copies in stock. Set the quantity to 0 before deleting it."
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (confirmDelete) {
      setBooks(
        books.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div>
      <h1>📚 Book Management</h1>

      {currentUser.role === "Admin" && (
        <div className="form-box">

          <h3>
            {editingId
              ? "✏️ Update Book"
              : "➕ Add New Book"}
          </h3>

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />

          <input
            type="number"
            min="0"
            placeholder="Initial Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button onClick={saveBook}>
            {editingId
              ? "💾 Update Book"
              : "➕ Add Book"}
          </button>

          {editingId && (
            <button
              className="cancel-btn"
              onClick={clearForm}
            >
              ❌ Cancel
            </button>
          )}

        </div>
      )}

      <div className="table-box">

        <h3>📖 Library Books</h3>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Status</th>

              {currentUser.role === "Admin" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>

            {books.map((book) => (

              <tr
                key={book.id}
                className={
                  book.quantity < 2
                    ? "low-stock"
                    : ""
                }
              >

                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>

                <td>
                  {book.quantity === 0
                    ? "❌ Out of Stock"
                    : book.quantity < 2
                    ? "⚠️ Low Stock"
                    : "🟢 Available"}
                </td>

                {currentUser.role === "Admin" && (
                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => editBook(book)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteBook(book.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </td>
                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Books;