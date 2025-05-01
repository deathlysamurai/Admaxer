import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-purple-900 hover:text-purple-700 transition-colors duration-200 mb-8"
        >
          AdMaxer
        </button>

        <h1 className="text-3xl font-bold text-purple-900 mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Introduction</h2>
            <p>
              AdMaxer ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Information We Collect</h2>
            <p>
              AdMaxer is designed with privacy in mind. We do not collect, store, or process any personal information from our users. All messages and sender names are processed locally in your browser and are not stored on our servers.
            </p>
            <p className="mt-2">
              The messages you create are:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Encrypted in your browser</li>
              <li>Only accessible through the unique URL generated</li>
              <li>Not stored on our servers</li>
              <li>Automatically deleted when the page is closed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google's Ads Settings page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Google AdSense for advertising</li>
              <li>GitHub Pages for hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 