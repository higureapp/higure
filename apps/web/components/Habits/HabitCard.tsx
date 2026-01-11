import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Habit } from '@/gql_generated/graphql'
import { useCompleteHabitMutation } from '@/hooks/useCompleteHabitMutation'
import { DifficultyBadge } from './DifficultyBadge'
import { toast } from 'sonner'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { HabitStats } from './HabitStats'

interface HabitCardProps {
    habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
    const { mutateAsync: completeHabit, isPending: loading } =
        useCompleteHabitMutation()
    const [showStats, setShowStats] = useState(false)

    const handleComplete = async () => {
        try {
            await completeHabit({
                input: { habitId: habit.id },
            })
            toast.success('Habit completed successfully!')
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unknown error occurred.')
            }
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    {habit.category && (
                        <Badge
                            className="mr-2"
                            style={{
                                backgroundColor:
                                    habit.category.color || '#94a3b8',
                            }}
                        >
                            {habit.category.name}
                        </Badge>
                    )}
                    <DifficultyBadge level={habit.difficulty} />
                </CardHeader>

                <CardContent>
                    <h3 className="text-xl font-semibold">{habit.title}</h3>
                    {habit.description && (
                        <p className="text-gray-600">{habit.description}</p>
                    )}

                    {habit.scheduledTime && (
                        <p className="text-sm text-gray-500">
                            Scheduled:{' '}
                            {new Date(habit.scheduledTime).toLocaleTimeString()}
                        </p>
                    )}

                    <p className="text-sm text-gray-500">
                        Streak: {habit.streakCount} days
                    </p>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button onClick={handleComplete} disabled={loading}>
                        {loading ? 'Completing...' : 'Complete'}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowStats(true)}
                    >
                        View Stats
                    </Button>
                </CardFooter>
            </Card>

            <Dialog open={showStats} onOpenChange={setShowStats}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{habit.title} Statistics</DialogTitle>
                    </DialogHeader>
                    <HabitStats habitId={habit.id} />
                </DialogContent>
            </Dialog>
        </>
    )
}
