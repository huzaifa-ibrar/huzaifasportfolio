# Email Configuration for Contact Form

This document explains how to set up and configure the email functionality for your portfolio's contact form.

## Prerequisites

1. You need a Hotmail/Outlook account.
2. You'll need to use your Hotmail account password.
3. You might need to adjust security settings to allow less secure apps.

## Setting Up Environment Variables

1. Create a `.env.local` file in the root of your project.
2. Add the following lines to the file:

```
# Email service credentials
EMAIL_USER=your-email@hotmail.com
EMAIL_PASS=your-hotmail-password
```

Replace `your-email@hotmail.com` with your actual Hotmail email address and `your-hotmail-password` with your Hotmail password.

## Allowing Less Secure Apps in Microsoft Account

To allow the email service to work with your Hotmail account:

1. Go to your Microsoft account security settings at https://account.microsoft.com/security
2. You may need to enable "Less secure app access" or generate an "App password" if you have two-factor authentication enabled.
3. If you encounter issues, you may need to create an app-specific password in your Microsoft account security settings.

## Testing the Contact Form

After setting up your environment variables:

1. Restart your development server.
2. Fill out the contact form.
3. Submit the form - you should receive the email at the address you configured.

## Deploying to Vercel or Netlify

When deploying to Vercel or Netlify, you'll need to add your environment variables to your project settings on those platforms.

### Vercel
1. Go to your project on the Vercel dashboard.
2. Click on "Settings" > "Environment Variables."
3. Add `EMAIL_USER` and `EMAIL_PASS` with their respective values.

### Netlify
1. Go to your project on the Netlify dashboard.
2. Click on "Site settings" > "Build & deploy" > "Environment."
3. Add `EMAIL_USER` and `EMAIL_PASS` with their respective values.

## Troubleshooting

If you encounter issues with sending emails:

1. Check your environment variables are correctly set.
2. Make sure your Microsoft account allows access for less secure apps.
3. If you have two-factor authentication enabled, you might need to create an app password.
4. Try disabling any settings in your Microsoft account that might block third-party access.
5. Check the server logs for any specific error messages. 