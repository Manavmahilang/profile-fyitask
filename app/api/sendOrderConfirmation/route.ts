import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Order Confirmation",
            html: `
                <h1>Thank you for your order!</h1>
                <p>We have received your order and will process it shortly.</p>
                <p>If you have any questions, feel free to contact us.</p>
            `
        });

        return NextResponse.json({ message: 'Order confirmation email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send order confirmation email' }, { status: 500 });
    }
}
