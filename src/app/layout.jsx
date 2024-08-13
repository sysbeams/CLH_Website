import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({ subsets: ["latin"], weights: [400, 500, 600, 700] });

export const metadata = {
  title: "CLH",
  description: "Code Learners Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="5NodRWHf3zcQrdQ9ovWELJ67E3K_f_eWtkWWvduT34o" />
      </head>
      <body className={quickSand.className}>{children}</body>
    </html>
  );
}
