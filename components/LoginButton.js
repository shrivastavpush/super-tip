'use client'

import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const router = useRouter();
    return (
        <button onClick={() => router.push("/login")}>Sign In</button>
    )
}

export default LoginButton