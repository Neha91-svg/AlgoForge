import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AlgoForge | Master Algorithms Visually",
  description: "A premium platform to visualize and master Data Structures and Algorithms with interactive tools and smooth animations.",
  keywords: ["DSA", "AlgoForge", "Algorithm Visualizer", "Data Structures", "Programming", "Computer Science"],
  authors: [{ name: "AlgoForge Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary",
          inter.variable,
          outfit.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-[25%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
          
          <main className="flex-1 relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
