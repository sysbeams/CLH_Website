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
      <body className={quickSand.className}>{children}</body>
    </html>
  );
}
