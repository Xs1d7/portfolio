import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jefferson Alves | Portfolio",
  description:
    "Tech Lead e Engenheiro de Software Sênior — Backend, IA, automação e microsserviços em nuvem.",
  keywords: [
    "tech lead",
    "software engineer",
    "backend",
    "go",
    "rust",
    "node.js",
    "ai agents",
    "portfolio",
    "engenheiro de software",
  ],
  authors: [{ name: "Jefferson Alves" }],
  openGraph: {
    title: "Jefferson Alves | Portfolio",
    description:
      "Tech Lead e Engenheiro de Software Sênior — Backend, IA, automação e microsserviços em nuvem.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jefferson Alves | Portfolio",
    description:
      "Tech Lead e Engenheiro de Software Sênior — Backend, IA, automação e microsserviços em nuvem.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'system';
    var resolved = theme;
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.classList.add(resolved);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
              {children}
            </div>
            <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
