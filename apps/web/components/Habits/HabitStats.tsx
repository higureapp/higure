'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useGetHabitStatsQuery } from '@/hooks/useGetHabitStatsQuery'
import { StatsPeriod } from '@/gql_generated/graphql'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface HabitStatsProps {
    habitId: string
}

export function HabitStats({ habitId }: HabitStatsProps) {
    const [period, setPeriod] = useState<StatsPeriod>(StatsPeriod.Week)
    const { data, loading, error } = useGetHabitStatsQuery(habitId, period)

    if (loading) return <p>Loading stats...</p>
    if (error)
        return (
            <p>
                Error:{' '}
                {error instanceof Error ? error.message : 'An error occurred'}
            </p>
        )

    const {
        completionRate,
        currentStreak,
        longestStreak,
        totalCompletions,
        completionsByDay,
    } = data?.habitStats || {}

    const chartData =
        completionsByDay?.map((day) => ({
            date: new Date(day.date).toLocaleDateString(),
            completed: day.completed ? 1 : 0,
        })) || []

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Habit Statistics</CardTitle>
                    <Select
                        onValueChange={(value: StatsPeriod) => setPeriod(value)}
                        defaultValue={period}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={StatsPeriod.Week}>
                                Week
                            </SelectItem>
                            <SelectItem value={StatsPeriod.Month}>
                                Month
                            </SelectItem>
                            <SelectItem value={StatsPeriod.Year}>
                                Year
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <p>
                        <strong>Completion Rate:</strong>{' '}
                        {completionRate?.toFixed(2)}%
                    </p>
                    <p>
                        <strong>Current Streak:</strong> {currentStreak} days
                    </p>
                    <p>
                        <strong>Longest Streak:</strong> {longestStreak} days
                    </p>
                    <p>
                        <strong>Total Completions:</strong> {totalCompletions}
                    </p>
                </div>

                <h3 className="text-lg font-semibold mb-4">
                    Completions by Day
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
