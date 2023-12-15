import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class NotificationMail {
  public static async sendEmail(
    targetPrice: number,
    token: string,
    receiverEmail: string,
    notificationType: string,
  ) {
    try {
      const subject = `NotiFly Alert! The value of ${token} has been updated and now stands at $${targetPrice}. `;
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
        to: receiverEmail,
        subject: subject,
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
               NotiFly Alert!
              </h1>
              <p
              style="font-size: 17px; line-height: 35px; margin-bottom: 10px; padding: 10px;"
              >
              The current <span style="font-weight: 600; font-size: 19px;" >${token}</span> price is<span style="font-weight: 600; font-size: 19px;" > $${targetPrice}.</span> </br> The value of the <span style="font-weight: 600; font-size: 20px;" >${token}</span> token has changed to <span style="font-weight: 600; font-size: 19px;" >$${targetPrice}</span>
              </p>
              <!-- Button with an onclick event that triggers the redirection -->
              <a href=${"http://localhost:3000"} target="_blank">
                <button
                  type="submit"
                  style="
                    padding: 10px 50px;
                    font-size: 16px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    color: #09090b;
                    font-weight: 800;
                    background-color: #fafafa;
                    margin-top: 60px;
                  "
                >
                  Create New Alert
                </button>
              </a>
            </div>
            <div style="margin-top:180px;color: #fafafa;">© 2023 NotiFly. All rights reserved</div>
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
