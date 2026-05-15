export const metadata = {
  title: "Crowdfunding Site",
  description: "Donation Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

  <style>{`
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }
  `}</style>

  {children}

</body>
    </html>
  );
}
