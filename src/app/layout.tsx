import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Moritz Renner | Portfolio",
    template: "%s | Moritz Renner",
  },
  description:
    "EN: Personal portfolio of Moritz Renner — interactive web experiences, UI experiments, and projects. DE: Persönliches Portfolio von Moritz Renner — interaktive Web-Erlebnisse, UI-Experimente und Projekte.",
  alternates: {
    languages: {
      en: "/",
      de: "/",
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", type: "image/x-icon" },
      { url: "/images/Favicon.png", type: "image/png" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>       
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="icon" type="image/png" href="/images/Favicon.png" />
        <link rel="apple-touch-icon" href="/images/Favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"      
          defaultTheme="dark"  
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
