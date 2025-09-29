import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold text-center mb-12 text-blue-500">Get in Touch</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-lg mb-4">Have questions or want to learn more about Midnite.auto?</p>
          <p className="text-lg mb-8">Reach out to us, and let&apos;s talk cars!</p>
          <a href="mailto:info@midnite.auto" className="px-8 py-4 rounded-full font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition duration-300">Email Us</a>
        </div>
        {/* You can add a more complex contact form here if needed */}
        
      </div>
    </div>
  );
};

export default Contact;
