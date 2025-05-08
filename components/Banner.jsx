import LoginButton from "@/components/LoginButton"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BackgroundGrid } from "@/components/Common/BackgroundGrid"

const Banner = () => {

  return (
    <main className="flex justify-center items-center flex-col px-8 mx-auto relative h-[85vh] w-full z-20">

      <BackgroundGrid />

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