import React from "react";
import SEO from "../components/SEO";

const TermsConditions: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Terms & Conditions | De Wedding Factory | Service Agreement"
        description="Terms and conditions for De Wedding Factory wedding planning services. Read our service agreement, booking policies, and terms of use."
        keywords="terms and conditions, service agreement, wedding planning terms, booking policies, legal terms, service contract"
        canonical="https://deweddingfactory.com/terms-conditions"
      />
      
      <div className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-8 text-center">
            Terms & Conditions
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-12"></div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using De Wedding Factory's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">2. Service Description</h2>
            <p className="mb-4">De Wedding Factory provides the following services:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Wedding planning and coordination</li>
              <li>Event design and decoration</li>
              <li>Vendor management and coordination</li>
              <li>Destination wedding planning</li>
              <li>Virtual consultation services</li>
              <li>Digital brochure and planning materials</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">3. Booking and Payment Terms</h2>
            
            <h3 className="font-serif text-xl mb-4 text-gray-800">3.1 Booking Process</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>All bookings require a signed contract and initial deposit</li>
              <li>Bookings are confirmed only upon receipt of payment</li>
              <li>We reserve the right to refuse service at our discretion</li>
              <li>All prices are subject to change without notice</li>
            </ul>

            <h3 className="font-serif text-xl mb-4 text-gray-800">3.2 Payment Schedule</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Initial deposit: 50% of total service cost</li>
              <li>Second payment: 30% due 60 days before event</li>
              <li>Final payment: 20% due 7 days before event</li>
              <li>Additional charges may apply for last-minute changes</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">4. Cancellation and Refund Policy</h2>
            
            <h3 className="font-serif text-xl mb-4 text-gray-800">4.1 Client Cancellation</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>90+ days before event: 75% refund</li>
              <li>60-89 days before event: 50% refund</li>
              <li>30-59 days before event: 25% refund</li>
              <li>Less than 30 days: No refund</li>
            </ul>

            <h3 className="font-serif text-xl mb-4 text-gray-800">4.2 Force Majeure</h3>
            <p className="mb-6">
              In case of force majeure events (natural disasters, government restrictions, etc.), we will work with clients to reschedule or provide partial refunds based on circumstances.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">5. Client Responsibilities</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Make timely payments as per agreed schedule</li>
              <li>Respond promptly to requests for decisions and approvals</li>
              <li>Obtain necessary permits and licenses</li>
              <li>Ensure venue access and vendor cooperation</li>
              <li>Provide emergency contact information</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">6. Our Responsibilities</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide professional wedding planning services</li>
              <li>Maintain confidentiality of client information</li>
              <li>Coordinate with vendors and service providers</li>
              <li>Ensure timely execution of planned activities</li>
              <li>Provide regular updates and communication</li>
              <li>Maintain professional standards and ethics</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">7. Limitation of Liability</h2>
            <p className="mb-6">
              De Wedding Factory's liability is limited to the total amount paid for services. We are not liable for indirect, incidental, or consequential damages. We are not responsible for vendor performance or external factors beyond our control.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">8. Intellectual Property</h2>
            <p className="mb-6">
              All content, designs, and materials created by De Wedding Factory remain our intellectual property. Clients may use materials for personal purposes but may not reproduce or distribute them commercially without written permission.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">9. Privacy and Confidentiality</h2>
            <p className="mb-6">
              We maintain strict confidentiality regarding client information and event details. We will not share client information with third parties without consent, except as required by law or for service provision.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">10. Virtual Consultation Services</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Virtual consultations are available for international clients</li>
              <li>Consultations are conducted via video conferencing</li>
              <li>Recording of consultations requires prior consent</li>
              <li>Technical issues are not grounds for refunds</li>
              <li>Follow-up materials will be provided digitally</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">11. Digital Brochures and Downloads</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Digital materials are for personal use only</li>
              <li>Sharing with unauthorized parties is prohibited</li>
              <li>Materials may be updated without notice</li>
              <li>Access may be revoked for policy violations</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">12. Governing Law</h2>
            <p className="mb-6">
              These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Visakhapatnam, Andhra Pradesh.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">13. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-gray-900">14. Contact Information</h2>
            <p className="mb-4">
              For questions about these terms and conditions, please contact us:
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
