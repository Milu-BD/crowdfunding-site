export const metadata = {
  title: "Crowdfunding Site",
  description: "Donation Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
