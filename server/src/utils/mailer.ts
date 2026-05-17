import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.ethereal.email",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER || "test_user",
                pass: process.env.SMTP_PASS || "test_pass",
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"MERN Auth" <no-reply@example.com>',
            to,
            subject,
            text,
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.warn("SMTP email sending failed, logging to console instead:", error);
        console.log(`\n========================================\n[MAIL] To: ${to}\n[MAIL] Subject: ${subject}\n[MAIL] Text: ${text}\n========================================\n`);
    }
};

export default sendEmail;
