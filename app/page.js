"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const targetAmount = 50000;
  const currentAmount = 12500;

  const percentage = (currentAmount / targetAmount) * 100;

  const targetDate = new Date("2026-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("Campaign Ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
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

  const shareWebsite = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Crowdfunding Campaign",
        text: "Support our crowdfunding campaign!",
        url: window.location.href,
      });
    } else {
      alert("Share option is not supported on this device.");
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
        Help us reach our goal of 50,000 BDT
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

        <p><strong>Bank Name:</strong> Dutch Bangla Bank</p>
        <p><strong>Account Name:</strong> Your Name</p>
        <p><strong>Account Number:</strong> 1234567890</p>

        <p style={{ marginTop: "15px", color: "red" }}>
          After payment, contact us with transaction proof.
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <h2>About Campaign Owner</h2>

        <p>
          This crowdfunding campaign is organized to support
          an important social and educational initiative.
          Your contribution will make a meaningful impact.
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <h2>Campaign Ends In</h2>

        <h1>{timeLeft}</h1>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={shareWebsite}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Share Campaign
        </button>
      </div>
    </div>
  );
}
