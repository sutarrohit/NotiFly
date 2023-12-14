import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";

export class VerificationMail {
  public static async sendEmail(options: { email: string; subject: string; clientURL: string }) {
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
        html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Click to Redirect</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 20px 0;
      font-family: Arial, sans-serif;
      background-color: #09090b;
      color: #fafafa;
      text-align: center;
      height: 100vh;
      position: relative;
    "
  >
    <div style="margin-top: 15%">
      <h1 style="font-size: 40px; margin-bottom: 10px padding">
        Welcome to Notifly
      </h1>
      <p
        style="
          font-size: 16px;
          margin-bottom: 50px;
          margin-top: 40px;
          font-size: 18px;
        "
      >
        Please click on the button to verify your email and activate your
        account.
      </p>

      <!-- Button with an onclick event that triggers the redirection -->
      <a href=${options.clientURL} target="_blank">
        <button
          type="submit"
          style="
            padding: 10px 60px;
            font-size: 16px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            color: #09090b;
            font-weight: 800;
            background-color: #fafafa;
          "
        >
          Click to verify
        </button>
      </a>

      <div style="margin-top: 40px">
        <p style="font-size: 15px">
          Please note this link will expire within 24 hours.
        </p>
      </div>
    </div>
  </body>
</html>

        `,
      };
      const info: SentMessageInfo = await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}
