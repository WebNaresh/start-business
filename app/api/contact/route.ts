import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    try {
        const { name, email, phone, service, message } = await req.json()

        // Validate required fields
        if (!name || !email || !phone || !service || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        // Log environment variables (without sensitive data)
        console.log('SMTP Configuration:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER ? 'Configured' : 'Not configured',
            fromEmail: process.env.SMTP_FROM_EMAIL,
            toEmail: process.env.CONTACT_EMAIL
        })

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            debug: true, // Enable debug logging
            logger: true // Enable logger
        })

        // Verify SMTP connection
        try {
            await transporter.verify()
            console.log('SMTP connection verified successfully')
        } catch (verifyError) {
            console.error('SMTP connection verification failed:', verifyError)
            return NextResponse.json(
                { error: "Email service configuration error" },
                { status: 500 }
            )
        }

        // Email content
        const mailOptions = {
            from: `"Contact Form" <${process.env.SMTP_FROM_EMAIL}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission - ${service}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Contact Form Submission</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Service Interested In:</strong> ${service}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
                        This email was sent from your website's contact form.
                    </p>
                </div>
            `,
        }

        // Send email
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', info.messageId)

        return NextResponse.json(
            { message: "Email sent successfully", messageId: info.messageId },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        )
    }
} 