import LoginButton from "./LoginButton"
import { AuroraText } from "./magicui/aurora-text"

const Banner = () => {

  return (
    <main className="flex justify-center items-center flex-col px-8 mx-auto relative transition-all duration-700 h-[80vh] w-full z-20">

      <div className="absolute inset-0 bg-[radial-gradient(circle,_#e5e7eb_2px,_transparent_2px)] bg-[length:30px_30px] -z-10"></div>

      <AuroraText>Super Tip</AuroraText>

      {/* Modern subtitle with hover effect */}
      <p className="text-xl text-gray-700 mt-5 font-medium tracking-wide transition-transform duration-300 hover:scale-105">
        Your Ultimate Chat Tip Manager
      </p>

      <LoginButton
        variant="outline"
        name="Get Started"
        className="mt-8 px-6 py-5 text-md font-semibold" />
    </main>
  )
}

export default Banner