import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faqData } from "@/data/FAQ";

const FaqAccordion = () => {
  return (
    <section className="w-full relative bg-black">
      <div className="rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-100 tracking-tight">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="mb-2 border-b border-neutral-800 last:border-b-0"
            >
              <AccordionTrigger
                className="text-base text-neutral-100 hover:text-green-400 transition-colors px-4 py-2 rounded-md focus:outline-none"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-neutral-300 px-4 py-2 text-sm leading-relaxed"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FaqAccordion;