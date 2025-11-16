import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, verificationTokens } from "@/db/schema";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const [existingToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token));

  if (!existingToken) {
    return NextResponse.json(
      { error: "Token does not exist" },
      { status: 404 }
    );
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return NextResponse.json({ error: "Token has expired" }, { status: 400 });
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, existingToken.email));

  console.log(existingUser);

  if (!existingUser) {
    return NextResponse.json(
      { error: "Email does not exist" },
      { status: 404 }
    );
  }

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, existingToken.id));

  return NextResponse.json(
    { success: "Email verified , redirecting..." },
    { status: 200 }
  );
}
