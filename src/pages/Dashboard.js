function Dashboard({
  books,
  users,
  transactions
}) {
  const totalBooks = books.length;

  const totalCopies = books.reduce(
    (total, book) =>
      total + Number(book.quantity),
    0
  );

  const lowStockBooks = books.filter(
    (book) => book.quantity < 2
  );

  const totalUsers = users.length;

  const totalTransactions =
    transactions.length;

  return (
    <div>

      <div className="welcome">
        <h1>📚 Welcome to My Library</h1>

        <p>
          Manage books, users and library
          transactions easily.
        </p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>📚</h2>
          <h3>{totalBooks}</h3>
          <p>Total Books</p>
        </div>

        <div className="dashboard-card">
          <h2>📦</h2>
          <h3>{totalCopies}</h3>
          <p>Total Copies</p>
        </div>

        <div className="dashboard-card">
          <h2>👥</h2>
          <h3>{totalUsers}</h3>
          <p>Users</p>
        </div>

        <div className="dashboard-card">
          <h2>💳</h2>
          <h3>{totalTransactions}</h3>
          <p>Transactions</p>
        </div>

      </div>

      <div className="table-box">

        <h2>⚠️ Low Stock Books</h2>

        {lowStockBooks.length === 0 ? (
          <p className="success-message">
            🟢 All books have enough stock.
          </p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {lowStockBooks.map((book) => (

                <tr
                  key={book.id}
                  className="low-stock"
                >
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
                  <td>
                    {book.quantity === 0
                      ? "❌ Out of Stock"
                      : "⚠️ Low Stock"}
                  </td>
                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      <div className="table-box">

        <h2>🧾 Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {transactions
                .slice()
                .reverse()
                .slice(0, 5)
                .map((transaction) => (

                  <tr key={transaction.id}>
                    <td>{transaction.user}</td>
                    <td>{transaction.book}</td>
                    <td>{transaction.action}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.date}</td>
                  </tr>

                ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Dashboard;