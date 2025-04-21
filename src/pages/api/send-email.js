import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { emailBdy, senderEmail, subject } = req.body;

    try {
        // Configure the email transporter
        let transporter = nodemailer.createTransport(MailtrapTransport({
    token: "98be8fac52f28330b48aa111f62c3a96",
  }));

        // Email options
        let mailOptions = {
            from: "hello@codelearnershub.com",
            to: [
                "hello@codelearnershub.com",
              ],
            subject: subject,
            html: emailBdy
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
}

