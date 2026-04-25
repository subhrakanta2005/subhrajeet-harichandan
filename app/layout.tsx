import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subhrajeet Harichandan — Author | Poet | Storyteller',
  description: 'Official author website of Subhrajeet Harichandan. Explore books including Love Will Find You, Can You Comfort My Aches, and I Had You. Available on Amazon, Flipkart & Notion Press.',
  keywords: ['Subhrajeet Harichandan', 'Indian author', 'Love Will Find You', 'Can You Comfort My Aches', 'I Had You', 'Notion Press', 'Odisha author'],
  authors: [{ name: 'Subhrajeet Harichandan' }],
  openGraph: {
    title: 'Subhrajeet Harichandan — Author | Poet | Storyteller',
    description: 'Official author website of Subhrajeet Harichandan from Bhubaneswar, Odisha.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
