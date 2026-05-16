"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const targetAmount = 50000;

  const [currentAmount, setCurrentAmount] = useState(0);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [trxId, setTrxId] = useState("");

  const [message, setMessage] = useState("");

  const percentage = Math.min(
  (currentAmount / targetAmount) * 100,
  100
);

const extraAmount =
  currentAmount > targetAmount
    ? currentAmount - targetAmount
    : 0;

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
  title: "Khidmatul Ummah Welfare Foundation",
  url: "https://khidmatul-ummah-welfare-foundation.vercel.app/",
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
      <a
  href="#qurbani-crowdfunding"
  style={{
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    marginBottom: "20px",
  }}
>

  <div
    style={{
      background: "yellow",
      color: "black",
      padding: "14px 24px",
      borderRadius: "12px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "20px",
      animation: "blink 1s infinite",
      boxShadow: "0 0 15px rgba(255,0,0,0.5)",
      cursor: "pointer",
      maxWidth: "320px",
      width: "100%",
    }}
  >
    📢 Crowdfunding Going On...
    <br />
    ক্রাউডফান্ডিং চলমান...📢
      <br /> 
      (Tap Here/এখানে চাপুন)
  </div>

</a>
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
  Khidmatul Ummah Welfare Foundation
  <br />
  <span
    style={{
      fontSize: "20px",
      color: "#444",
    }}
  >
    (খিদমাতুল উম্মাহ ওয়েলফেয়ার ফাউন্ডেশন)
  </span>
</h1>
<div
  style={{
    marginTop: "25px",
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "10px",
    lineHeight: "1.8",
  }}
>

  <h2 style={{ color: "darkred" }}>
    লক্ষ্য ও উদ্দেশ্য
  </h2>

  <p>
    আর্ত মানবতার সেবা, সামাজিক কল্যাণ এবং অসহায়,
    সুবিধাবঞ্চিত ও দরিদ্র মানুষের পাশে থেকে
    বিভিন্ন সেবামূলক কার্যক্রম পরিচালনা করা।
  </p>

  <h2 style={{ color: "darkgreen" }}>
    চলমান প্রজেক্টসমূহ
  </h2>

  <p>
    ফাউন্ডেশনের বর্তমান এবং ভবিষ্যৎ
    মানবকল্যাণমূলক প্রজেক্টগুলোর তালিকা নিচে
    দেওয়া হলো:
  </p>

  <ul>

    <li>রোজা ও ঈদ প্রজেক্ট</li>

    <li>
      কুরবানী প্রজেক্ট
      (কুরবানী করে গোশত বিতরণ)
    </li>

    <li>
      শীতকালীন কম্বল বিতরণ কার্যক্রম
    </li>

    <li>সাব-প্রজেক্ট</li>

    <li>
      মসজিদ পরিষ্কার-পরিচ্ছন্নতা কার্যক্রম
    </li>

    <li>
      অসুস্থ রোগীদের আর্থিক সহায়তা প্রদান
    </li>

  </ul>

  <h2 style={{ color: "darkblue" }}>
    পরিকল্পিত প্রজেক্টসমূহ
  </h2>

  <ul>

    <li>
      সাবলম্বী প্রজেক্ট
      (যাকাতের অর্থের মাধ্যমে)
    </li>

    <li>
      ব্রেইনস্টর্মিং প্রজেক্ট
      (পাঠসভার পক্ষ থেকে)
    </li>

  </ul>

  <p
    style={{
      color: "darkred",
      fontWeight: "bold",
    }}
  >
    বিশেষ দ্রষ্টব্য:
  </p>

  <p>
    আলোচনা সাপেক্ষে ভবিষ্যতে আরও
    সময়োপযোগী বিভিন্ন মানবকল্যাণমূলক
    প্রজেক্ট যুক্ত করার পরিকল্পনা রয়েছে।
  </p>

  <h2 style={{ color: "purple" }}>
    আহ্বান ও অনুরোধ
  </h2>

  <p>
    ফাউন্ডেশনের সকল কার্যক্রম সফলভাবে
    পরিচালনার জন্য সমাজের বিত্তবান ও
    সচেতন মহলের আন্তরিক সহযোগিতা ও
    দোয়া কামনা করা হচ্ছে।
  </p>

    <h2 style={{ color: "brown" }}>
    নোটিশ
  </h2>

  {/* NEW SECTION ADDED BELOW */}
  <div style={{ fontStyle: "italic", marginBottom: "20px", color: "#333", borderLeft: "4px solid brown", paddingLeft: "15px" }}>
    <p>সম্মানিত সুধী,<br />আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ।</p>
    
    <p>
      পবিত্র ঈদুল আজহা আমাদের ত্যাগের মহিমায় উদ্ভাসিত হওয়ার সুযোগ করে দেয়। এই আনন্দের দিনে আমাদের আশেপাশে এমন অনেক দরিদ্র ও নিঃস্ব পরিবার রয়েছে, যারা আর্থিক সংকটের কারণে কুরবানির আনন্দ থেকে বঞ্চিত থাকে। আমাদের পূর্ববর্তী প্রজেক্টসমূহের অভিজ্ঞতা থেকে এমন কিছু মানুষের সন্ধান পাই, যারা পূর্বে ভালো পরিস্থিতিতে ছিলো, কিন্তু বর্তমানের অনটনের অবস্থা মুখ ফুটে কাউকে বলতে পারে না। সেইসব অবহেলিত মানুষের দোরগোড়ায় ফাউন্ডেশন কর্তৃক কুরবানিকৃত পশুর গোশত পৌঁছে দিয়ে তাদের মুখে হাসি ফোটানোই আমাদের এবারের প্রজেক্টের লক্ষ্য।
    </p>

    <p><strong> আমাদের প্রজেক্টের আনুমানিক বাজেট: ৫০,০০০/- (পঞ্চাশ হাজার) টাকা।</strong></p>

    <p>
      এই মানবিক প্রজেক্টটি সফলভাবে বাস্তবায়নের জন্য আমরা আপনাদের আন্তরিক সহযোগিতা ও ভালোবাসা কামনা করছি। আপনাদের সামর্থ্য অনুযায়ী যেকোনো ক্ষুদ্র অবদান আমাদের এই লক্ষ্য পূরণে অনেক বড় ভূমিকা পালন করবে। আসুন, আমরা সকলে মিলে বড় দেওড়া এলাকার অসহায় মানুষের জন্য ঈদের আনন্দকে সহজ ও আনন্দময় করে তুলি।
    </p>

    <p>
      আল্লাহ তা'আলা আমাদের এই প্রচেষ্টাকে কবুল করুন এবং আমাদের উত্তম প্রতিদান দান করুন। আমীন।
    </p>
  </div>
  {/* NEW SECTION ADDED ABOVE */}

  <p>
    (আমন্ত্রণের নিবেদক ও শুভেচ্ছান্তে)
  </p>

  <ul>
    <li>
      তাহমিদ ইবনে আশরাফ –
      সভাপতি, কেন্দ্রীয় কমিটি,
      খিদমাতুল উম্মাহ ওয়েলফেয়ার ফাউন্ডেশন
    </li>
    <li>
      নেয়ামুল হাসান নাদিম –
      আহ্বায়ক, কুরবানী প্রজেক্ট কমিটি
    </li>
  </ul>


</div>
        <h2
  id="qurbani-crowdfunding"
  style={{
    textAlign: "center",
    color: "blue",
  }}
>
  Crowdfunding Campaign of Qurbani
  <br />
  (কুরবানি ক্রাউডফান্ডিং ক্যাম্পেইন)
</h2>

<p
  style={{
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  }}
>
  Help us reach our target ৳50,000
  <br />
  (আমাদের লক্ষ্য ৫০,০০০ টাকায় পৌঁছাতে সাহায্য করুন)
</p>
<div
  style={{
    width: "100%",
    background: "#ddd",
    borderRadius: "12px",
    overflow: "hidden",
    marginTop: "20px",
    position: "relative",
    height: "35px",
  }}
>
  <div
    style={{
      width: `${percentage}%`,
      background: "green",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "red",
      fontWeight: "bold",
      transition: "0.5s",
    }}
  >
    {percentage.toFixed(1)}%
  </div>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    fontWeight: "bold",
    color: "#444",
  }}
>
  <div>
  <div>
    Raised: ৳{currentAmount}
  </div>

  {extraAmount > 0 && (
    <div
      style={{
        color: "green",
        fontSize: "16px",
        marginTop: "4px",
      }}
    >
      ✨ +৳{extraAmount} Barakah Bonus
    </div>
  )}
</div>

  <span>
    Target: ৳{targetAmount}
  </span>
</div>

<p
  style={{
    textAlign: "center",
    marginTop: "10px",
    fontWeight: "bold",
    color: "#444",
  }}
>
  Crowdfunding Progress
  <br />
  ক্রাউডফান্ডিং অগ্রগতি
</p>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >

        <h2>Bank Payment Information (ব্যাংক পেমেন্ট তথ্য)</h2>

        <p><strong>Payment Method (পেমেন্ট পদ্ধতি):</strong> Bkash/Nagad (বিকাশ/নগদ)</p>

        <p><strong>Account Name (অ্যাকাউন্টের নাম):</strong> MOAJ BILLAH NAJIF</p>

        <p><strong>Account Number (অ্যাকাউন্ট নম্বর):</strong> 01745016118</p>

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
    color: "red",
    marginTop: "-5px",
    marginBottom: "10px",
    fontSize: "14px",
  }}
>
  Your payment information will be reviewed before updating the crowdfunding progress (ক্রাউডফান্ডিংয়ের অগ্রগতি আপডেট করার আগে আপনার পেমেন্টের তথ্য পর্যালোচনা করা হবে)
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
          Central Branch (Temporary) / কেন্দ্রীয় কার্যালয়(অস্থায়ী): 2nd Floor, Baitul Mamur Jame Masjid, Boro Dewra, Tongi West, Gazipur / ২য় তলা, বাইতুল মামুর জামে মসজিদ, বড় দেওড়া, টঙ্গী পশ্চিম, গাজীপুর।
        </p>

        <p>
  <strong>Phone (ফোন):</strong><br />

  <a
    href="tel:+8801785061618"
    style={{
      color: "blue",
      textDecoration: "none",
    }}
  >
    +8801785061618
  </a>

  {" , "}

  <a
    href="tel:+8801963886708"
    style={{
      color: "blue",
      textDecoration: "none",
    }}
  >
    +8801963886708
  </a>

</p>

        <p>
  <strong>Email (ইমেইল):</strong><br />

  <a
    href="mailto:khidmatulummah522@gmail.com"
    style={{
      color: "blue",
      textDecoration: "none",
    }}
  >
    khidmatulummah522@gmail.com
  </a>

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
            Visit Our Facebook Page (আমাদের ফেসবুক পেজ ভিজিট করুন)
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
          Share Our Website
        </button>

      </div>

    </div>

</div>
  );
}
