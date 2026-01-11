'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DifficultyLevel, FrequencyType } from '@/gql_generated/graphql';
import { useCreateHabitMutation } from '@/hooks/useCreateHabitMutation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the form schema
const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    description: z.string().optional(),
    categoryId: z.string().optional(), // Will be a select later
    frequency: z.enum(FrequencyType, { message: 'Frequency is required.' }),
    frequencyConfig: z.record(z.string(), z.any()), // This will be dynamic based on frequency
    dailyRepetitions: z.number().int().min(1).optional(),
    scheduledTime: z.string().optional(), // Convert to Date before sending
    reminderTime: z.string().optional(), // Convert to Date before sending
    difficulty: z.enum(DifficultyLevel).optional(),
    dueDate: z.string().optional(), // Convert to Date before sending
});

type FormValues = z.infer<typeof formSchema>;

interface CreateHabitFormProps {
    onOpenChange: (open: boolean) => void;
    open: boolean;
}

export function CreateHabitForm({ onOpenChange, open }: CreateHabitFormProps) {
    const { mutateAsync: createHabit, isPending: loading } = useCreateHabitMutation();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            categoryId: undefined,
            frequency: FrequencyType.Daily,
            frequencyConfig: {},
            dailyRepetitions: 1,
            scheduledTime: undefined,
            reminderTime: undefined,
            difficulty: DifficultyLevel.Normal,
            dueDate: undefined,
        },
    });

    async function onSubmit(values: FormValues) {
        try {
            const { scheduledTime, reminderTime, dueDate, ...rest } = values;

            await createHabit({
                input: {
                    ...rest,
                    scheduledTime: scheduledTime ? new Date(scheduledTime) : undefined,
                    reminderTime: reminderTime ? new Date(reminderTime) : undefined,
                    dueDate: dueDate ? new Date(dueDate) : undefined,
                },
            });
            toast.success('Habit created successfully!');
            onOpenChange(false);
            form.reset(); // Reset form after successful submission
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Habit</DialogTitle>
                    <DialogDescription>
                        Fill in the details for your new habit.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Read a book" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Read 1 chapter daily" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Frequency */}
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(FrequencyType).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type.replace(/_/g, ' ')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Difficulty */}
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Difficulty</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(DifficultyLevel).map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level.replace(/_/g, ' ')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading}>Create Habit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
