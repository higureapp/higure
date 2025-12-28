'use client'

import { useUsers } from '@/hooks/useUsers'

export default function UsersPage() {
    const { data: users, isLoading, error, refetch } = useUsers()

    if (isLoading) {
        return <div>Caricamento...</div>
    }

    if (error) {
        return <div>Errore: {error.message}</div>
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Utenti</h1>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Ricarica
                </button>
            </div>

            <div className="grid gap-4">
                {users?.map((user) => (
                    <div key={user.id} className="border p-4 rounded">
                        <h2 className="font-semibold">
                            {user.firstname} {user.lastname}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
