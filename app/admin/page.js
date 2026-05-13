"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [donations, setDonations] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false); // New state for password

  // 1. Password Check logic
  useEffect(() => {
    const password = prompt("Enter Admin Password:");
    if (password === "kuwf@2026") { // Change "1234" to your own secret password
      setIsAuthorized(true);
      fetchAll();
    } else {
      alert("Wrong password!");
    }
  }, []);

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
    return (
      <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial" }}>
        <h1>🚫 Access Denied</h1>
        <p>You must enter the correct password to view this page.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "10px", background: "black", color: "white" }}>
          Try Again
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
