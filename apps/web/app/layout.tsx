import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/sonner'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
})

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
})

const charterRegular = localFont({
    src: './fonts/CharterRegular.woff2',
    variable: '--font-charter',
    display: 'swap'
})

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
            <body className={`${charterRegular.className}`}>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}
