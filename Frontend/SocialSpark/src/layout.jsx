import "./globals.css"

export const metadata = {
  title: "Social-Spark",
  description: "Connect brands with influencers. Amplify your reach. Spark conversations.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

