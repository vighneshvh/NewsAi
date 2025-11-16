import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const passwordResetTemplate = (resetLink: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Reset Your Password</title>
    <style>
      .container { 
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
      }
      .button {
        background-color: #3b82f6;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        display: inline-block;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <a href="${resetLink}" class="button">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  </body>
</html>
`;

const verificationEmailTemplate = (confirmLink: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Verify Your Email</title>
    <style>
      .container { 
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
      }
      .button {
        background-color: #3b82f6;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        display: inline-block;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Vike!</h1>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${confirmLink}" class="button">Verify Email</a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>
  </body>
</html>
`;

const confirmChangeMailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Confirm Email Change</title>
    <style>
      .container { 
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
      }
      .otp {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 4px;
        margin: 20px 0;
        color: #3b82f6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email Change Verification</h1>
      <p>Your OTP for email verification is:</p>
      <div class="otp">${otp}</div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this change, please secure your account immediately.</p>
    </div>
  </body>
</html>
`;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Reset Your Password",
      html: passwordResetTemplate(resetLink),
    });
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-mail?token=${token}`;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify Your Email Address",
      html: verificationEmailTemplate(confirmLink),
    });
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

export const sendConfirmChangeMail = async (email: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Change Verification",
      html: confirmChangeMailTemplate(otp),
    });
    return true;
  } catch (error) {
    console.error("Error sending email change confirmation:", error);
    return false;
  }
};
