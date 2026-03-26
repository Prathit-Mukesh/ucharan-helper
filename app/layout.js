export const metadata = {
  title: "Ucharan Helper - English Pronunciation Guide with Hindi",
  description: "Learn correct English pronunciation with Hindi Devanagari script. Search any word, name, or brand. Hear pronunciation in Indian, British & American accents. Free, offline-first PWA.",
  keywords: "english pronunciation, hindi pronunciation, ucharan, english to hindi, pronunciation guide, how to pronounce, indian english",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#0f0a1a",
  manifest: "/manifest.json",
  openGraph: {
    title: "Ucharan Helper - English Pronunciation Guide",
    description: "Learn correct English pronunciation with Hindi script. Search any word and hear it spoken.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
