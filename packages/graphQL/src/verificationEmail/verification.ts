import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";

export class VerificationMail {
  public static async sendEmail(options: { email: string; subject: string; message: string }) {
    try {
      // Create a transporter using Gmail SMTP
      const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      // Send email
      const mailOptions: SendMailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
      const info: SentMessageInfo = await transporter.sendMail(mailOptions);
      return true;
      // console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}
