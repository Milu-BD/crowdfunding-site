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

  const targetDate = new Date("2026-05-26T23:59:59").getTime();

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

    } else {

      setMessage("Something went wrong.");

    }
  };

  const shareWebsite = async () => {

    if (navigator.share) {

      await navigator.share({
  title: "Khidmatul Ummah Welfare Foundation Crowdfunding Campaign",
  url: "https://milu-bd-crowdfunding-site.vercel.app/",
});

    } else {

      alert("Sharing not supported.");

    }
  };

  return (
    <div
  style={{
    position: "relative",
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
    overflow: "hidden",
  }}
>

  <div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "350px",
    height: "350px",

    backgroundImage: "url('/logo.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",

    opacity: 0.10,

    zIndex: 0,
    pointerEvents: "none",
  }}
/>

  <div style={{ position: "relative", zIndex: 1 }}>
      <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>

  <h2
    style={{
      color: "green",
      marginBottom: "10px",
    }}
  >
    Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh
  </h2>

  <p
    style={{
      color: "darkred",
      fontWeight: "bold",
      fontSize: "18px",
    }}
  >
    🌙 Eid-ul-Adha Mubarak 🌙
  </p>

</div>
      <h1 style={{ textAlign: "center" }}>
  Khidmatul Ummah Welfare Foundation (খিদমতুল উম্মাহ ওয়েলফেয়ার ফাউন্ডেশন)
  <br />
  <span style={{ color: "blue" }}>
    Crowdfunding Campaign of Qurbani (কুরবানি ক্রাউডফান্ডিং ক্যাম্পেইন)
  </span>
</h1>
      <p
  style={{
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  }}
>
  Help us reach our target ৳50,000 (আমাদের লক্ষ্য ৫০,০০০ টাকায় পৌঁছাতে সাহায্য করুন)
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
        Raised (সংগৃহীত): ৳{currentAmount} / ৳{targetAmount}
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

        <p><strong>Payment Method:</strong> Bkash/Nagad</p>

        <p><strong>Account Name:</strong> MOAJ BILLAH NAJIF</p>

        <p><strong>Number:</strong> 01745016118</p>

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

        <h2>
  Submit Payment Information
  <br />
  <span style={{ fontSize: "16px", color: "gray" }}>
    (পেমেন্ট তথ্য জমা দিন)
  </span>
</h2>

<p
  style={{
    color: "gray",
    marginTop: "-5px",
    marginBottom: "10px",
    fontSize: "14px",
  }}
>
  Your payment information will be reviewed before updating the crowdfunding progress.
</p>

        <input
          type="text"
          placeholder="Your Name (আপনার নাম)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px",
          }}
        />

        <input
          type="number"
          placeholder="Donation Amount (অনুদানের পরিমাণ)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            padding: "12px",
          }}
        />

        <input
          type="text"
          placeholder="Transaction ID (লেনদেন নম্বর) Example: DE40SXH8E7"
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
          Submit Donation (তথ্য জমা দিন)
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

        <h2>
  Campaign Ends In
  <br />
  <span style={{ fontSize: "16px", color: "gray" }}>
    (ক্যাম্পেইন শেষ হতে বাকি)
  </span>
</h2>

        <h1>{timeLeft}</h1>

      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Contact Information (যোগাযোগ)
        </h2>

        <p>
          <strong>Address (ঠিকানা):</strong><br />
          Main Branch: Boro Dewra, Tongi, Gazipur
        </p>

        <p>
          <strong>Phone (ফোন):</strong><br />
          +8801785061618
        </p>

        <p>
          <strong>Email (ইমেইল):</strong><br />
          khidmatulummah522@gmail.com
        </p>

        <p>
          <strong>Facebook Page (ফেসবুক পেজ):</strong><br />
          <a
            href="https://www.facebook.com/profile.php?id=61550894840553"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "blue",
              wordBreak: "break-word",
            }}
          >
            Visit Our Facebook Page (পেজ ভিজিট করুন)
          </a>
        </p>

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

</div>
  );
}
