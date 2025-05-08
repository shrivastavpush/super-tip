import Banner from "@/components/Banner";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ContactForm from "@/components/ContactForm";
import { BackgroundGrid } from "@/components/Common/BackgroundGrid";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";

export default function Home() {
  return (
    <>
      <SmoothCursor />

      {/* banner section */}
      <Banner />

      {/* velocity scroll section */}
      <section className="py-10 bg-black/5">
        <VelocityScroll className="text-black" defaultVelocity={5} direction="right">SuperChatsMadeEasy</VelocityScroll>
        <VelocityScroll className="text-emerald-500" defaultVelocity={10} direction="left">SuperTip</VelocityScroll>
      </section>

      {/* features section */}
      <section id="features" className="flex justify-center items-center h-screen">
        <h1>Features</h1>
      </section>

      {/* pricing section */}
      <section id="pricing" className="flex justify-center items-center h-screen bg-gray-50">
        <h1>Pricing</h1>
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
