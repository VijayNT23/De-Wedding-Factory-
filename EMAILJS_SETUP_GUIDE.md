# EmailJS Setup Guide

This guide will help you set up EmailJS to send emails from your contact form directly to your email address.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript without needing a backend server. It's perfect for static websites and React applications.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. **Login to EmailJS Dashboard**
2. **Go to "Email Services"** in the left sidebar
3. **Click "Add New Service"**
4. **Choose your email provider:**
   - **Gmail** (Recommended)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**

### For Gmail Setup:
1. Select "Gmail" from the list
2. Click "Connect Account"
3. Sign in with your Gmail account
4. Grant necessary permissions
5. Your service will be created with an ID like `service_1234567`

## Step 3: Create Email Template

1. **Go to "Email Templates"** in the left sidebar
2. **Click "Create New Template"**
3. **Design your template** with these variables:

### Template Variables (use these exact names):
```
{{from_name}} - Client's name
{{from_email}} - Client's email
{{phone}} - Client's phone number
{{event_date}} - Event date
{{event_type}} - Type of event
{{guest_count}} - Number of guests
{{budget}} - Budget range
{{message}} - Client's message
{{to_email}} - Your email address
```

### Sample Template HTML:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
    New Wedding Inquiry
  </h2>
  
  <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
    <h3 style="color: #555; margin-top: 0;">Client Information</h3>
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
  </div>

  <div style="background-color: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 5px;">
    <h3 style="color: #555; margin-top: 0;">Event Details</h3>
    <p><strong>Event Date:</strong> {{event_date}}</p>
    <p><strong>Event Type:</strong> {{event_type}}</p>
    <p><strong>Guest Count:</strong> {{guest_count}}</p>
    <p><strong>Budget:</strong> {{budget}}</p>
  </div>

  <div style="background-color: #e8f4f8; padding: 20px; margin: 20px 0; border-radius: 5px;">
    <h3 style="color: #555; margin-top: 0;">Message</h3>
    <p style="white-space: pre-wrap; line-height: 1.6;">{{message}}</p>
  </div>

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
    <p>This inquiry was sent from your wedding planning website contact form.</p>
    <p>Reply directly to this email to respond to the client.</p>
  </div>
</div>
```

4. **Save the template** - You'll get a template ID like `template_1234567`

## Step 4: Get Your Public Key

1. **Go to "Account"** in the left sidebar
2. **Find "Public Key"** section
3. **Copy your public key** (looks like `abcdefghijklmnop`)

## Step 5: Update Your Code

Open `src/services/emailService.ts` and replace these values:

```typescript
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_1234567'; // Your service ID
const EMAILJS_TEMPLATE_ID = 'template_1234567'; // Your template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Your public key

// Replace with your actual email address
to_email: 'your-email@gmail.com', // Your email address
```

## Step 6: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Go to your contact page**
3. **Fill out the form and submit**
4. **Check your email inbox** for the inquiry

## Step 7: Configure Email Settings (Optional)

### Set Reply-To Address:
In your EmailJS template, you can set the reply-to address to the client's email:

```html
<!-- Add this to your template HTML head section -->
<meta name="reply-to" content="{{from_email}}">
```

### Set Subject Line:
In your EmailJS service settings, you can customize the subject line:

```
New Wedding Inquiry from {{from_name}}
```

## Troubleshooting

### Common Issues:

1. **"Invalid service ID" error:**
   - Double-check your service ID in the EmailJS dashboard
   - Make sure there are no extra spaces or characters

2. **"Template not found" error:**
   - Verify your template ID is correct
   - Ensure the template is published (not in draft)

3. **"Invalid public key" error:**
   - Check your public key in the EmailJS account settings
   - Make sure you're using the correct key

4. **Emails not being sent:**
   - Check browser console for error messages
   - Verify all template variables are correctly named
   - Test with a simple template first

5. **CORS errors:**
   - EmailJS handles CORS automatically
   - If you see CORS errors, check your domain settings in EmailJS

### Testing Tips:

1. **Use browser developer tools** to check for JavaScript errors
2. **Test with different email addresses** to ensure delivery
3. **Check spam folder** if emails aren't arriving
4. **Use EmailJS dashboard** to see sending statistics

## Free Plan Limits

- **200 emails per month**
- **2 email services**
- **2 email templates**
- **Basic support**

## Upgrade Options

If you need more emails or features:
- **Personal Plan:** $15/month - 1,000 emails
- **Business Plan:** $30/month - 5,000 emails
- **Enterprise Plan:** Custom pricing

## Security Notes

- **Public key is safe** to use in frontend code
- **No sensitive data** is stored in EmailJS
- **Rate limiting** prevents abuse
- **Email validation** is handled automatically

## Support

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Support:** Available through their dashboard
- **Community Forum:** [https://github.com/emailjs-com/emailjs-sdk](https://github.com/emailjs-com/emailjs-sdk)

## Quick Setup Checklist

- [ ] Created EmailJS account
- [ ] Added email service (Gmail/Outlook/etc.)
- [ ] Created email template with all variables
- [ ] Got service ID, template ID, and public key
- [ ] Updated `emailService.ts` with your credentials
- [ ] Updated email address in the code
- [ ] Tested the contact form
- [ ] Received test email in your inbox

Your contact form is now ready to send emails directly to your inbox! 🎉
