import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel.js";

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // find user based on token and update
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //create a transporter
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "37415083f0e142",
        pass: "6049d182e4cc06",
      },
    });

    //create mailoptions
    const mailOptions = {
      from: "roshan.shah@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      }
      <br />
      Or copy and paste the below link in your browser :
      <br />
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    // send an email
    const mailResponse = await transporter.sendMail(mailOptions);

    // return mail response
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
