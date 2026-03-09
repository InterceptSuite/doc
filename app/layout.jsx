import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'InterceptSuite Docs',
    template: '%s | InterceptSuite Docs',
  },
  description:
    'Official documentation for InterceptSuite and ProxyBridge - advanced network interception tools built by the InterceptSuite team.',
  keywords: ['InterceptSuite', 'ProxyBridge', 'TLS interception', 'SOCKS5', 'network proxy', 'Python extensions'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'InterceptSuite Docs',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-background text-content min-h-screen">{children}</body>
    </html>
  )
}
