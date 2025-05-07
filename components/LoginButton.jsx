'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/magicui/border-beam';

const LoginButton = ({ variant = "default", name, className }) => {

    const router = useRouter();

    const handleClick = () => {

        if (name === "Sign In") {
            router.push("/login");
        }

        if (name === "Get Started") {
            router.push("/login");
        }
    }

    return (
        <>
            <Button
                variant={variant}
                onClick={handleClick}
                className={`${className} cursor-pointer relative`}>
                {name}

                {name === "Get Started" && (
                    <BorderBeam
                        duration={5}
                        className="from-green-700 via-green-500 to-transparent absolute"
                    />
                )}
            </Button>
        </>
    )
}

export default LoginButton