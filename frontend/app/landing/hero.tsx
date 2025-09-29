import React from 'react';

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white" style={{ backgroundImage: 'url(/f1-hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center p-4">
        <div className="max-w-xl mx-auto">
          <h1 className="mb-5 text-5xl md:text-6xl font-extrabold leading-tight">Ignite Your Passion. Share Your Drive.</h1>
          <p className="mb-8 text-lg md:text-xl leading-relaxed opacity-90">Welcome to Midnite.auto, the ultimate social network for car enthusiasts. Showcase your builds, discover epic events, and connect with a global community of petrolheads.</p>
          <button className="px-8 py-4 rounded-full font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
