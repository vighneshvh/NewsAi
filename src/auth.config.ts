import Google from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "./lib/schema";
import { getUserByEmail } from "./lib/userQueries";
import { compare } from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // @ts-expect-error error
      async authorize(credentials) {
        const validateFields = SignInSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          if (!user.emailVerified) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;

          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
