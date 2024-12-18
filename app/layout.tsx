"use client";
import { Provider } from "react-redux";
import { store } from "./store"; // Redux store'unuzu import edin
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {" "}
          <div className="flex flex-col md:flex-row">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
