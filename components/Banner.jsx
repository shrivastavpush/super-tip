import LoginButton from "./LoginButton"

const Banner = () => {

  return (
    <main className="flex justify-center items-center flex-col py-4 px-8 bg-gradient-to-t from-white to-gray-50  mx-auto relative transition-all duration-700 mt-28 h-[90vh] w-full z-20">

      {/* Animated glowing title with green gradient */}
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent h-18">
        Supertip
      </h1>

      {/* Modern subtitle with hover effect */}
      <p className="text-xl text-gray-700 mt-5 font-medium tracking-wide transition-transform duration-300 hover:scale-105">
        Your Ultimate Chat Tip Manager
      </p>

      <LoginButton
        variant="default"
        name="Get Started"
        className="mt-8 px-6 py-4 text-md font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
    </main>
  )
}

export default Banner