import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <Banner />
      <section className="flex justify-center items-center h-screen">
        <h1>Features</h1>
      </section>
      <section className="flex justify-center items-center h-screen">
        <h1>Pricing</h1>
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
