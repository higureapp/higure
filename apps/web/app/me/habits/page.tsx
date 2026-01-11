'use client'

import { useGetHabitsQuery } from '@/hooks/useGetHabitsQuery'
import { HabitCard } from '@/components/Habits/HabitCard'
import { CreateHabitForm } from '@/components/Habits/CreateHabitForm'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function HabitsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { data, isLoading, error } = useGetHabitsQuery()

    if (isLoading) return <p>Loading habits...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Habits</h1>
                <Button onClick={() => setIsFormOpen(true)}>
                    Create New Habit
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.habits?.map((habit) => (
                    <HabitCard key={habit.id} habit={habit} />
                ))}
            </div>
            <CreateHabitForm open={isFormOpen} onOpenChange={setIsFormOpen} />
        </div>
    )
}
