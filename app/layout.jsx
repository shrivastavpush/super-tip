import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    template: "SuperTip - %s",
    default: "SuperTip"
  },
  description: "SuperTip - Tipping Your Creator Made Easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
