import dynamic from "next/dynamic";

import Banner from "@/components/Banner";
import { BackgroundGrid, BackgroundGridGreen } from "@/components/Common/BackgroundGrid";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import RazorPay from "@/components/razorpay/RazorPay";

const Features = dynamic(() => import("@/components/Features/Features"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FaqAccordion = dynamic(() => import("@/components/FaqAccordion"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <SmoothCursor />

      {/* banner section */}
      <Banner />

      {/* velocity scroll section */}
      <section className="py-10 bg-black/5">
        <VelocityScroll className="text-emerald-500" defaultVelocity={10} direction="left">SuperTip</VelocityScroll>
        <VelocityScroll className="text-black" defaultVelocity={5} direction="right">SuperChatsMadeEasy</VelocityScroll>
      </section>

      {/* features section */}
      <section className="flex justify-center bg-black items-center flex-col px-8 mx-auto relative w-full z-20" id="features">
        <Features />
      </section>

      {/* pricing section */}
      <section className='flex justify-center items-center flex-col p-10 md:p-14 mx-auto relative w-full h-auto z-20' id="pricing">
        <BackgroundGridGreen />

        <Pricing />
      </section>

      <FaqAccordion />

      {/* contact section */}
      <section className='flex justify-center items-center flex-col px-8 mx-auto relative h-[80vh] w-full z-20' id="contact">

        <BackgroundGrid />
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}
