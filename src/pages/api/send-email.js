import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { emailBdy, senderEmail, subject } = req.body;

    try {
        // Configure the email transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });
        

        // Email options
        let mailOptions = {
            from: senderEmail,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: emailBdy
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
}
