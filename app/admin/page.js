"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [donations, setDonations] = useState([]);

  const fetchAll = async () => {
    const res = await fetch("/api/admin");
    const data = await res.json();
    if (data.success) setDonations(data.donations);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const approve = async (id) => {
    await fetch("/api/admin", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    fetchAll(); // Refresh list
  };

  const remove = async (id) => {
    if (confirm("Delete this donation?")) {
      await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetchAll(); // Refresh list
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Name</th>
            <th>Amount</th>
            <th>TrxID</th>
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
