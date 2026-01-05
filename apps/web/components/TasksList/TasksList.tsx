import { Task } from '@/types/Task'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TasksListProps {
    tasks: Task[]
}

export function TasksList({ tasks }: TasksListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {tasks.length === 0 ? (
                    <p>No tasks yet.</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>{task.title}</li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
