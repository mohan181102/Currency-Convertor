import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Currency converter",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}><Toaster position="top-center"/><time dateTime="25-04-24" suppressHydrationWarning/>{children}</body>
    </html>
  );
}
