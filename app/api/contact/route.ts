import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Creating email transporter with credentials:', {
      user: process.env.EMAIL_USER ? 'Email provided' : 'Email missing',
      pass: process.env.EMAIL_PASS ? 'Password provided' : 'Password missing',
    });

    // Configure your email service for Hotmail/Outlook
    // Use a more reliable configuration for Outlook
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug mode
    });

    // Test the connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { error: `SMTP verification failed: ${verifyError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'huzaifa.57@hotmail.com', // Your email where you want to receive messages
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log('Attempting to send email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      
      return NextResponse.json(
        { message: 'Email sent successfully', info: info.response },
        { status: 200 }
      );
    } catch (sendError: any) {
      console.error('Failed to send email:', sendError);
      return NextResponse.json(
        { error: `Failed to send email: ${sendError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: `Error processing request: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 