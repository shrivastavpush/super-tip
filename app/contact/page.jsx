import ContactForm from '@/components/ContactForm'

export const metadata = {
    title: "Contact Us",
    description: "Contact page"
}

const Contact = () => {
    return (
        <section className='flex justify-center items-center flex-col px-8 mx-auto relative h-screen w-full z-20'>

            <div className="absolute inset-0 bg-[radial-gradient(circle,_#e5e7eb_2px,_transparent_2px)] bg-[length:30px_30px] -z-10"></div>

            <ContactForm />
        </section>
    )
}

export default Contact