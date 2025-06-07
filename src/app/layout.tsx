import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { createContext } from "react";
import ChatWidget from "@/components/ChatWidget";
import { CartProvider } from "@/components/CartContext";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "PizzaHub",
  description: "Twój nowoczesny portal do zamawiania pizzy."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <ChatWidget />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// createContext([])
