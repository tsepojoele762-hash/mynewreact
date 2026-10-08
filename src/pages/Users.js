import React from "react";

function Users({
  users,
  setUsers,
  transactions,
  currentUser
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [membershipId, setMembershipId] = React.useState("");
  const [role, setRole] = React.useState("User");
  const [editingId, setEditingId] = React.useState(null);

  const clearForm = () => {
    setName("");
    setEmail("");
    setMembershipId("");
    setRole("User");
    setEditingId(null);
  };

  const saveUser = () => {
    if (
      name === "" ||
      email === "" ||
      membershipId === ""
    ) {
      alert("Please fill in all user fields.");
      return;
    }

    if (editingId) {
      const updatedUsers = users.map((user) => {
        if (user.id === editingId) {
          return {
            ...user,
            name,
            email,
            membershipId,
            role
          };
        }

        return user;
      });

      setUsers(updatedUsers);
      alert("User updated successfully.");
    } else {
      const newUser = {
        id:
          users.length > 0
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1,
        name,
        email,
        membershipId,
        role
      };

      setUsers([...users, newUser]);
      alert("User added successfully.");
    }

    clearForm();
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setMembershipId(user.membershipId);
    setRole(user.role);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteUser = (id) => {
    const user = users.find(
      (item) => item.id === id
    );

    if (user.id === currentUser.id) {
      alert("You cannot delete the account currently logged in.");
      return;
    }

    const borrowed = transactions.filter(
      (transaction) =>
        transaction.user === user.name &&
        transaction.action === "Borrowed"
    );

    const returned = transactions.filter(
      (transaction) =>
        transaction.user === user.name &&
        transaction.action === "Returned"
    );

    const borrowedCount = borrowed.reduce(
      (total, transaction) =>
        total + Number(transaction.quantity),
      0
    );

    const returnedCount = returned.reduce(
      (total, transaction) =>
        total + Number(transaction.quantity),
      0
    );

    if (borrowedCount > returnedCount) {
      alert(
        `${user.name} still has borrowed books and cannot be deleted.`
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${user.name}"?`
    );

    if (confirmDelete) {
      setUsers(
        users.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div>
      <h1>👥 User Management</h1>

      {currentUser.role === "Admin" && (
        <div className="form-box">

          <h3>
            {editingId
              ? "✏️ Update User"
              : "➕ Add New User"}
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Membership ID"
            value={membershipId}
            onChange={(e) =>
              setMembershipId(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="User">
              User
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          <button onClick={saveUser}>
            {editingId
              ? "💾 Update User"
              : "➕ Add User"}
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

        <h3>👤 Registered Users</h3>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Membership ID</th>
              <th>Role</th>

              {currentUser.role === "Admin" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.membershipId}</td>
                <td>{user.role}</td>

                {currentUser.role === "Admin" && (
                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editUser(user)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user.id)
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

export default Users;