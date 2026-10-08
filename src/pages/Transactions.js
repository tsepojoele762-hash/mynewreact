import React from "react";

function Transactions({
  books,
  users,
  transactions,
  setTransactions,
  setBooks
}) {
  const [user, setUser] = React.useState("");
  const [book, setBook] = React.useState("");
  const [action, setAction] = React.useState("Borrowed");
  const [quantity, setQuantity] = React.useState(1);

  const addTransaction = () => {
    if (book === "") {
      alert("Please select a book.");
      return;
    }

    if (Number(quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    const selectedBook = books.find(
      (item) => item.title === book
    );

    if (!selectedBook) {
      alert("Book not found.");
      return;
    }

    const amount = Number(quantity);

    if (
      (action === "Borrowed" || action === "Returned") &&
      user === ""
    ) {
      alert("Please select a user.");
      return;
    }

    if (action === "Borrowed") {
      if (selectedBook.quantity < amount) {
        alert(
          `Only ${selectedBook.quantity} copy/copies available.`
        );
        return;
      }
    }

    if (action === "Returned") {
      const borrowedTransactions = transactions.filter(
        (transaction) =>
          transaction.user === user &&
          transaction.book === book &&
          transaction.action === "Borrowed"
      );

      const returnedTransactions = transactions.filter(
        (transaction) =>
          transaction.user === user &&
          transaction.book === book &&
          transaction.action === "Returned"
      );

      const borrowedAmount = borrowedTransactions.reduce(
        (total, transaction) =>
          total + Number(transaction.quantity),
        0
      );

      const returnedAmount = returnedTransactions.reduce(
        (total, transaction) =>
          total + Number(transaction.quantity),
        0
      );

      const currentlyBorrowed =
        borrowedAmount - returnedAmount;

      if (currentlyBorrowed < amount) {
        alert(
          `This user can only return ${currentlyBorrowed} copy/copies.`
        );
        return;
      }
    }

    let newQuantity = selectedBook.quantity;

    if (action === "Borrowed") {
      newQuantity -= amount;
    }

    if (action === "Returned") {
      newQuantity += amount;
    }

    if (action === "Stock Added") {
      newQuantity += amount;
    }

    const updatedBooks = books.map((item) => {
      if (item.title === book) {
        return {
          ...item,
          quantity: newQuantity
        };
      }

      return item;
    });

    const newTransaction = {
      id:
        transactions.length > 0
          ? Math.max(
              ...transactions.map(
                (transaction) => transaction.id
              )
            ) + 1
          : 1,
      user:
        action === "Stock Added"
          ? "Library Admin"
          : user,
      book,
      action,
      quantity: amount,
      date: new Date().toLocaleDateString()
    };

    setBooks(updatedBooks);
    setTransactions([
      ...transactions,
      newTransaction
    ]);

    setUser("");
    setBook("");
    setQuantity(1);

    alert("Transaction recorded successfully.");
  };

  return (
    <div>
      <h1>💳 Transactions</h1>

      <div className="form-box">

        <h3>📦 Manage Stock</h3>

        <select
          value={action}
          onChange={(e) =>
            setAction(e.target.value)
          }
        >
          <option value="Borrowed">
            📉 Borrow Book
          </option>

          <option value="Returned">
            🔄 Return Book
          </option>

          <option value="Stock Added">
            📦 Add Stock
          </option>
        </select>

        {(action === "Borrowed" ||
          action === "Returned") && (
          <select
            value={user}
            onChange={(e) =>
              setUser(e.target.value)
            }
          >
            <option value="">
              Select User
            </option>

            {users.map((item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={book}
          onChange={(e) =>
            setBook(e.target.value)
          }
        >
          <option value="">
            Select Book
          </option>

          {books.map((item) => (
            <option
              key={item.id}
              value={item.title}
            >
              {item.title} - {item.quantity} available
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <button onClick={addTransaction}>
          ✅ Record Transaction
        </button>

      </div>

      <div className="table-box">

        <h3>🧾 Transaction History</h3>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Book</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>
                <td>{item.user}</td>
                <td>{item.book}</td>
                <td>{item.action}</td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Transactions;