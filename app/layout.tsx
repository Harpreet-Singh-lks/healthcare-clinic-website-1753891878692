import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HealthCare Clinic',
  description: 'Professional healthcare services for you and your family',
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