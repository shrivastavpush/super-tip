
export default function LoginLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    {children}
                </div>
            </body>
        </html>
    );
}