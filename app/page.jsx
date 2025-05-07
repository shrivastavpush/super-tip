import Banner from "@/components/Banner";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  return (
    <>
      <SmoothCursor />

      <Banner />

      <section className="py-10 bg-black/5">
        <VelocityScroll className="text-black" defaultVelocity={5} direction="right">SuperChatsMadeEasy</VelocityScroll>
        <VelocityScroll className="text-emerald-500" defaultVelocity={10} direction="left">SuperTip</VelocityScroll>
      </section>

      <section className="flex justify-center items-center h-screen">
        <h1>Features</h1>
      </section>
      <section className="flex justify-center items-center h-screen">
        <h1>Contact</h1>
      </section>
      <footer className="flex justify-center items-center h-16 w-full bg-gray-200">
        <h1>Footer</h1>
      </footer>
    </>
  );
}
