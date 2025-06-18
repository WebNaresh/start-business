import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyRecaptcha(token: string) {
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        {
            method: "POST",
        }
    )

    const data = await response.json()
    return data.success && data.score >= 0.5
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, message, service, recaptchaToken } = body

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email and message are required" },
                { status: 400 }
            )
        }

        // Verify reCAPTCHA
        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
            return NextResponse.json(
                { error: "Invalid reCAPTCHA token" },
                { status: 400 }
            )
        }

        // Rate limiting check (implement your preferred rate limiting solution)
        // This is a simple example using a timestamp check
        const timestamp = Date.now()
        const lastSubmission = await fetch("https://api.yourdomain.com/rate-limit", {
            method: "POST",
            body: JSON.stringify({ email, timestamp }),
        })

        if (!lastSubmission.ok) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }

        // Send email to admin
        await resend.emails.send({
            from: "contact@yourdomain.com",
            to: process.env.ADMIN_EMAIL || "admin@yourdomain.com",
            subject: `New Contact Form Submission${service ? ` - ${service}` : ""}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service || "Not specified"}

Message:
${message}
      `,
        })

        // Send confirmation email to user
        await resend.emails.send({
            from: "noreply@yourdomain.com",
            to: email,
            subject: "Thank you for contacting us",
            text: `
Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.

Best regards,
Your Company Name
      `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        )
    }
} 