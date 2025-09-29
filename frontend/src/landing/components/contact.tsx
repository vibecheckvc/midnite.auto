import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-base-200 text-neutral-content">
      <h2 className="text-5xl font-bold text-center mb-12 text-primary">Get in Touch</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-lg mb-4">Have questions or want to learn more about Midnite.auto?</p>
          <p className="text-lg mb-8">Reach out to us, and let&apos;s talk cars!</p>
          <a href="mailto:info@midnite.auto" className="btn btn-secondary btn-lg">Email Us</a>
        </div>
        {/* You can add a more complex contact form here if needed */}
      </div>
    </div>
  );
};

export default Contact;
