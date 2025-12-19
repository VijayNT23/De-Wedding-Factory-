import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_5y7bukg';
const EMAILJS_TEMPLATE_ID = 'template_kqapahi';
const EMAILJS_PUBLIC_KEY = 'c8LAGOffgq8PEYZwS';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  budget: string;
  message: string;
}

export const sendInquiryEmail = async (formData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      event_date: formData.eventDate || 'Not specified',
      event_type: formData.eventType || 'Not specified',
      guest_count: formData.guestCount || 'Not specified',
      budget: formData.budget || 'Not specified',
      message: formData.message,
      to_email: 'astroboy1137@gmail.com',
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    };
  }
};

export const sendInquiryEmailToMultiple = async (formData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      event_date: formData.eventDate || 'Not specified',
      event_type: formData.eventType || 'Not specified',
      guest_count: formData.guestCount || 'Not specified',
      budget: formData.budget || 'Not specified',
      message: formData.message,
      to_email: 'your-email@gmail.com,backup-email@gmail.com',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    };
  }
};

