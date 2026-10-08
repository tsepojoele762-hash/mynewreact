import React from "react";

function Login({ users, setCurrentUser }) {
  const [membershipId, setMembershipId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (item) => item.membershipId === membershipId
    );

    if (!user) {
      alert("User not found. Check your Membership ID.");
      return;
    }

    if (password !== "1234") {
      alert("Incorrect password.");
      return;
    }

    setCurrentUser(user);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>📚 My Library</h1>

        <p>Library Management System</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Membership ID"
            value={membershipId}
            onChange={(e) =>
              setMembershipId(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            🔐 Login
          </button>

        </form>

        <div className="login-info">
          <p><strong>Demo Login</strong></p>
          <p>Admin ID: LIB001</p>
          <p>Password: 1234</p>
        </div>

      </div>
    </div>
  );
}

export default Login;