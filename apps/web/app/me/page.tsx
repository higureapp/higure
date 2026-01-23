'use client'

import { useMe } from '@/hooks/useMe'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Greeting } from '@/components/home/Greeting'

export default function MePage() {
    const { user, isLoading, isLoggedIn, logout } = useMe()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/auth/signin')
        }
    }, [isLoading, isLoggedIn, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isLoggedIn) {
        return null
    }

    return (
        <div className="flex p-6 justify-center min-h-screen">
            <div className="bg-black w-[50%]">
                <Greeting
                    firstName={user?.firstname}
                    timeZone={user?.timezone}
                />
            </div>
        </div>
    )
}
