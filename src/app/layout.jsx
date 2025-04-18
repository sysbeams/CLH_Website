import { Quicksand } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const quickSand = Quicksand({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

export const metadata = {
  title: "CLH",
  description: "Code Learners Hub",
  googleSiteVerification: "5NodRWHf3zcQrdQ9ovWELJ67E3K_f_eWtkWWvduT34o",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        {children}
      </body>
    </html>
  );
}
