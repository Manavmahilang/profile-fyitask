import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "manavmahilang78@gmail.com",
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`
    });
};

//for DEVELOPMENT

//for PRODUCTION ONLY!! 
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    //For Production 
    //TODO add domain to resend
    // const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "manavmahilang78@gmail.com",
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    //For Production 
    //TODO add domain to resend
    //const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "manavmahilang78@gmail.com",
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};

export const sendOrderConfirmationEmail = async (email: string) => {
    await resend.emails.send({
        from: "support@yourdomain.com", // Update with your actual sender email
        to: email,
        subject: "Order Confirmation",
        html: `
            <h1>Thank you for your order!</h1>
            <p>We have received your order and will process it shortly.</p>
            <p>If you have any questions, feel free to contact us.</p>
        `
    });
};


// THIS FILE IS USED TO SEND MAIL 