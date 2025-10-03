import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 h-full w-full bg-white"
          style={{
            backgroundImage:
              "linear-gradient(to right, #8080800a 1px, transparent 1px), linear-gradient(to bottom, #8080800a 1px, transparent 1px)",
            backgroundSize: "14px 24px",
          }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side: Text */}
        <div className="flex items-center justify-center lg:justify-start px-6 lg:px-20">
          <div className="text-center lg:text-left">
            <h1 className="double text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              The 24/7 Car Meet
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              Instagram but for car enthusiasts, the ultimate social network for
              car enthusiasts. Showcase your builds, discover epic events, and
              connect with a global community of racers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* <button className="text-white font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Mission statement
              </button> */}
            </div>
          </div>
        </div>

        {/* Right Side: Image with Glow */}
        <div className="flex items-center justify-center px-6 lg:px-20 relative">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-blue-400 opacity-40 blur-3xl z-0"></div>

          <div className="relative z-10 w-full h-80 lg:h-auto">
            <img
              src="/images/car_meet.jpg"
              alt="Car Meet"
              className="w-full h-full object-contain lg:object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
