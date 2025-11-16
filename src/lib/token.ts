import { v4 } from "uuid";

import {
  changeEmailToken,
  passwordResetToken,
  verificationTokens,
} from "@/db/schema";
import {
  getChangeEmailTokenByEmail,
  getPasswordResertTokenByEmail,
  getVerificationTokenByEmail,
} from "@/lib/userQueries";
import { generateOTP } from "./helpers";
import { eq } from "drizzle-orm";

import { db } from "@/db";



export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(Date.now() + 3600 * 1000);
  console.log(token);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  const [newToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return newToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = v4();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getPasswordResertTokenByEmail(email);


  if (existingToken) {
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, existingToken.id));
  }

  const [newToken] = await db
    .insert(passwordResetToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return newToken;
};

export const generateChangeMailToken = async (email: string) => {
  const otp = generateOTP();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getChangeEmailTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(changeEmailToken)
      .where(eq(changeEmailToken.id, existingToken.id));
  }

  const [newToken] = await db
    .insert(changeEmailToken)
    .values({
      email,
      token: otp,
      expires,
    })
    .returning();

  return newToken;
};
