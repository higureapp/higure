import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import Link from 'next/link'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
})

import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
    title: 'Higure',
    description: 'Higure - a simple app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers>
                    <nav className="p-4 bg-gray-800 text-white">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/me/habits">Habits</Link>
                            </li>
                        </ul>
                    </nav>
                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    )
}
