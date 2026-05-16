"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [donations, setDonations] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [passwordInput, setPasswordInput] = useState(""); // New state for password

  // 1. Password Check logic
  const checkPassword = () => {

  if (passwordInput === "milu&kuwf") {

    setIsAuthorized(true);
    fetchAll();

  } else {

    alert("Wrong password!");

  }
};

  const fetchAll = async () => {
    const res = await fetch("/api/admin");
    const data = await res.json();
    if (data.success) setDonations(data.donations);
  };

  const approve = async (id) => {
    await fetch("/api/admin", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    fetchAll(); 
  };

  const remove = async (id) => {
    if (confirm("Delete this donation?")) {
      await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetchAll();
    }
  };

  // 2. Access Denied View
  if (!isAuthorized) {
  if (!isAuthorized) {

  return (

    <div
      style={{
        padding: "50px",
        textAlign: "center",
        fontFamily: "Arial",
        maxWidth: "400px",
        margin: "auto",
      }}
    >

      <h1>🔐 Admin Login</h1>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Admin Password"
        value={passwordInput}
        onChange={(e) =>
          setPasswordInput(e.target.value)
        }
        style={{
          padding: "12px",
          width: "100%",
          marginTop: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          marginTop: "10px",
          textAlign: "left",
        }}
      >

        <label
          style={{
            cursor: "pointer",
          }}
        >

          <input
            type="checkbox"
            checked={showPassword}
            onChange={() =>
              setShowPassword(!showPassword)
            }
            style={{
              marginRight: "8px",
            }}
          />

          Show Password

        </label>

      </div>

      <button
        onClick={checkPassword}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

    </div>

  );
}
  // 3. The Actual Admin Table (only shows if isAuthorized is true)
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Secure Admin</h1>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
        <tr style={{ background: "#eee" }}>
  <th>Name</th>
  <th>Amount</th>
  <th>TrxID</th>
  <th>Submitted</th>
  <th>Status</th>
  <th>Actions</th>
</tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>৳{d.amount}</td>
              <td><code>{d.trxId}</code></td>

<td>
  {new Date(d.createdAt).toLocaleString()}
</td>

<td>
  {d.approved ? "✅ Approved" : "⏳ Pending"}
</td>
              <td>{d.approved ? "✅ Approved" : "⏳ Pending"}</td>
              <td>
                {!d.approved && (
                  <button onClick={() => approve(d._id)} style={{ background: "green", color: "white", marginRight: "5px" }}>
                    Approve
                  </button>
                )}
                <button onClick={() => remove(d._id)} style={{ background: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    }
