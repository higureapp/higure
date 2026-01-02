import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to Higure</h1>
            <p className="mb-8">Please sign in or sign up to continue.</p>
            <div className="flex gap-4">
                <Link href="/auth/signin">
                    <Button>Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                    <Button variant="secondary">Sign Up</Button>
                </Link>
            </div>
        </div>
    );
}
