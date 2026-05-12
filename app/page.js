"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const targetAmount = 50000;

  const [currentAmount, setCurrentAmount] = useState(0);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [trxId, setTrxId] = useState("");

  const [message, setMessage] = useState("");

  const percentage = (currentAmount / targetAmount) * 100;

  const targetDate = new Date("2026-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {

  const fetchDonations = async () => {

    try {

      const response = await fetch("/api/donate");

      const data = await response.json();

      if (data.success) {

        setCurrentAmount(data.total);

      }

    } catch (error) {

      console.log(error);

    }
  };

  fetchDonations();

  const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance < 0) {

      setTimeLeft("Campaign Ended");

      clearInterval(timer);

      return;
    }

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    setTimeLeft(
      `${days}d ${hours}h ${minutes}m ${seconds}s`
    );

  }, 1000);

  return () => clearInterval(timer);

}, []);

  const submitDonation = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        amount: Number(amount),
        trxId,
      }),
    });

    const data = await response.json();

    if (data.success) {

  setMessage("Donation submitted successfully!");

  const updated = await fetch("/api/donate");

  const updatedData = await updated.json();

  setCurrentAmount(updatedData.total);

  setName("");

  setAmount("");

  setTrxId("");

}

    } else {

      setMessage("Something went wrong.");

    }
  };

  const shareWebsite = async () => {

    if (navigator.share) {

      await navigator.share({
        title: "Crowdfunding Campaign",
        text: "Support our crowdfunding campaign!",
        url: window.location.href,
      });

    } else {

      alert("Sharing not supported.");

    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        Crowdfunding Campaign
      </h1>

      <p style={{ textAlign: "center" }}>
        Help us reach ৳50,000
      </p>

      <div
        style={{
          width: "100%",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: "green",
            color: "white",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>

      <h3 style={{ marginTop: "15px" }}>
        Raised: ৳{currentAmount} / ৳{targetAmount}
      </h3>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >

        <h2>Bank Payment Information</h2>

        <p><strong>Bank:</strong> Dutch Bangla Bank</p>

        <p><strong>Account Name:</strong> Your Name</p>

        <p><strong>Account Number:</strong> 1234567890</p>

      </div>

      <form
        onSubmit={submitDonation}
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >

        <h2>Submit Donation</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px",
          }}
        />

        <input
          type="number"
          placeholder="Donation Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            padding: "12px",
          }}
        />

        <input
          type="text"
          placeholder="Transaction ID"
          value={trxId}
          onChange={(e) => setTrxId(e.target.value)}
          required
          style={{
            padding: "12px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Submit Donation
        </button>

      </form>

      <p style={{ marginTop: "15px", color: "green" }}>
        {message}
      </p>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >

        <h2>Campaign Ends In</h2>

        <h1>{timeLeft}</h1>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >

        <button
          onClick={shareWebsite}
          style={{
            padding: "12px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Share Campaign
        </button>

      </div>

    </div>
  );
}
