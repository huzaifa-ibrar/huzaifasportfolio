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

    // Configure your email service for Hotmail/Outlook
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

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

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 