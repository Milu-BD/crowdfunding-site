"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [total, setTotal] = useState(0);
  const target = 50000;

  useEffect(() => {
    fetch("/api/donate")
      .then(res => res.json())
      .then(data => setTotal(data.total));
  }, []);

  const percent = (total / target) * 100;

  return (
    <div style={{ padding: 20 }}>
      <h1>Crowdfunding Project</h1>

      <p>Target: ৳50,000</p>

      <div style={{ background: "#eee", height: 20 }}>
        <div style={{
          width: `${percent}%`,
          background: "green",
          height: "100%"
        }} />
      </div>

      <p>{total} BDT collected</p>

      <h3>Bank Payment</h3>
      <p>Account: 123456789</p>

      <form onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        await fetch("/api/donate", {
          method: "POST",
          body: JSON.stringify({
            name: form.get("name"),
            amount: Number(form.get("amount")),
            trxId: form.get("trxId")
          })
        });

        alert("Submitted for approval");
      }}>
        <input name="name" placeholder="Name" required />
        <input name="amount" placeholder="Amount" required />
        <input name="trxId" placeholder="Transaction ID" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
