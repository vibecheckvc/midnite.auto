import React from 'react';

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: 'url(/f1-hero-bg.jpg)', backgroundSize: 'cover' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Ignite Your Passion. Share Your Drive.</h1>
          <p className="mb-5">Welcome to Midnite.auto, the ultimate social network for car enthusiasts. Showcase your builds, discover epic events, and connect with a global community of petrolheads.</p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
