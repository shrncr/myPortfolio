import type { Metadata } from "next";
import { Inter, Merriweather, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sara Hern-Car | Software Engineer & Developer",
  description: "Portfolio of Sara Hern-Car - Software Engineer specializing in full-stack development, AI integration, and modern web technologies.",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "TypeScript", "Next.js", "Portfolio"],
  authors: [{ name: "Sara Hern-Car" }],
  openGraph: {
    title: "Sara Hern-Car | Software Engineer & Developer",
    description: "Portfolio showcasing projects, experience, and technical blog posts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} ${firaCode.variable} font-sans antialiased`}
      >
        {/* Skip to Content Link for Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
