import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Login from "./pages/Login";

import {
  initialBooks,
  initialUsers,
  initialTransactions
} from "./data";

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("libraryBooks");
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("libraryUsers");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("libraryTransactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("libraryUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "libraryTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      {!currentUser ? (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                users={users}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      ) : (
        <div className="app">

          <nav className="navbar">

            <h2>📚 My Library</h2>

            <div className="links">
              <Link to="/">🏠 Dashboard</Link>
              <Link to="/books">📚 Books</Link>
              <Link to="/transactions">💳 Transactions</Link>
              <Link to="/users">👥 Users</Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                🚪 Logout
              </button>
            </div>

          </nav>

          <div className="user-bar">
            👤 Logged in as:
            <strong>
              {currentUser.name}
            </strong>

            <span>
              ({currentUser.role})
            </span>
          </div>

          <div className="content">

            <Routes>

              <Route
                path="/"
                element={
                  <Dashboard
                    books={books}
                    users={users}
                    transactions={transactions}
                  />
                }
              />

              <Route
                path="/books"
                element={
                  <Books
                    books={books}
                    setBooks={setBooks}
                    currentUser={currentUser}
                  />
                }
              />

              <Route
                path="/transactions"
                element={
                  <Transactions
                    books={books}
                    users={users}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    setBooks={setBooks}
                  />
                }
              />

              <Route
                path="/users"
                element={
                  <Users
                    users={users}
                    setUsers={setUsers}
                    transactions={transactions}
                    currentUser={currentUser}
                  />
                }
              />

              <Route
                path="/login"
                element={<Navigate to="/" replace />}
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Routes>

          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;