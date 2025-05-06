'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

const LoginButton = () => {
    const router = useRouter();
    return (
        <Button variant="default" onClick={() => router.push("/login")} className="bg-red-500 cursor-pointer">Sign In</Button>
    )
}

export default LoginButton