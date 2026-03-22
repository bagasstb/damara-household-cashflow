import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./providers";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Household Cashflow — Smart Expense Tracking",
  description:
    "Track your daily expenses, manage budgets, and get spending analytics with Household Cashflow. A cycle-based personal finance tracker.",
  openGraph: {
    title: "Household Cashflow",
    description: "Smart cycle-based expense tracking for couples",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Satoshi font from FontShare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
