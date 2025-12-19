import React from "react";
import SEO from "../components/SEO";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Privacy Policy | De Wedding Factory | Data Protection & Privacy"
        description="Privacy policy for De Wedding Factory. Learn how we collect, use, and protect your personal information for wedding planning services in India."
        keywords="privacy policy, data protection, wedding planners privacy, personal information, GDPR compliance, data security"
        canonical="https://deweddingfactory.com/privacy-policy"
      />
      
      <div className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-8 text-center">
            Privacy Policy
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-12"></div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">1. Introduction</h2>
            <p className="mb-6">
              De Wedding Factory ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our wedding planning services.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">2. Information We Collect</h2>
            
            <h3 className="font-serif text-xl mb-4 text-gray-800">2.1 Personal Information</h3>
            <p className="mb-4">We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Wedding date, venue preferences, and guest count</li>
              <li>Budget information and special requirements</li>
              <li>Photographs and videos from your events</li>
              <li>Payment and billing information</li>
              <li>Communication preferences and feedback</li>
            </ul>

            <h3 className="font-serif text-xl mb-4 text-gray-800">2.2 Automatically Collected Information</h3>
            <p className="mb-4">We automatically collect certain information when you visit our website:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">3. How We Use Your Information</h2>
            <p className="mb-4">We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Providing wedding planning and event coordination services</li>
              <li>Communicating with you about your event</li>
              <li>Processing payments and managing billing</li>
              <li>Improving our services and website functionality</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Complying with legal obligations</li>
              <li>Protecting against fraud and ensuring security</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> With trusted vendors who assist in event planning</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              <li><strong>Consent:</strong> When you have given explicit consent</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">5. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">6. Your Rights</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access and review your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">7. International Data Transfers</h2>
            <p className="mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">8. Children's Privacy</h2>
            <p className="mb-6">
              Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will take steps to delete the information.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">9. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
