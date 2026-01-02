"use client";

import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MePage() {
    const { user, isLoading, isLoggedIn, logout } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/auth/signin");
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <strong>ID:</strong> {user?.id}
                    </div>
                    <div>
                        <strong>First Name:</strong> {user?.firstname}
                    </div>
                    <div>
                        <strong>Last Name:</strong> {user?.lastname}
                    </div>
                    <div>
                        <strong>Email:</strong> {user?.email}
                    </div>
                    <Button onClick={() => {
                        logout();
                        router.push("/auth/signin");
                    }}>Logout</Button>
                </CardContent>
            </Card>
        </div>
    );
}
