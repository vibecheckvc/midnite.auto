import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-base-100">
      <h2 className="text-5xl font-bold text-center mb-12 text-primary">About Midnite.auto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg leading-relaxed mb-6">
            Midnite.auto is more than just an app; it's the heartbeat of the car enthusiast community. Imagine Instagram, but every post is a gleaming build, every story is a roaring track day, and every connection fuels your automotive passion.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our platform is designed to bring together like-minded individuals who live and breathe cars. From meticulously crafted show cars to high-performance track beasts, Midnite.auto is where your automotive journey comes to life.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-6 text-accent">Our Features:</h3>
          <ul className="list-disc list-inside text-lg space-y-3">
            <li><strong className="text-secondary">Social Network:</strong> Connect with fellow enthusiasts, share your latest modifications, and explore stunning car content from around the globe.</li>
            <li><strong className="text-secondary">View Your Builds:</strong> Create detailed profiles for each of your vehicles, track your progress, and get feedback from the community.</li>
            <li><strong className="text-secondary">Events Pages:</strong> Discover and organize local meetups, car shows, and track events. Never miss an opportunity to show off your ride or see others'.</li>
            <li><strong className="text-secondary">Personal Garage:</strong> A dedicated space to manage your car collection, dream builds, and project plans.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
