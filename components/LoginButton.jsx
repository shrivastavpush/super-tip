'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

const LoginButton = ({ variant = "default", name, className }) => {
    const router = useRouter();
    return (
        <Button
            variant={variant}
            onClick={() => router.push("/login")}
            className={`${className} cursor-pointer`}>
            {name}
        </Button>
    )
}

export default LoginButton