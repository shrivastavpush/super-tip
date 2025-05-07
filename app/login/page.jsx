import GoogleSignin from "@/components/GoogleSignin";

import { Suspense } from "react";

export const metadata = {
  title: "Login",
  description: "Login to your account"
}

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            SuperTip
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your Chat Tip Manager
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <GoogleSignin />
        </Suspense>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By signing in, you will grant access to your YouTube channel data
          </p>
        </div>
      </div>
    </div>
  );
}
