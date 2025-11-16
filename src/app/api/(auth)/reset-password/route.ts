import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, passwordResetToken } from "@/db/schema";
import { newPasswordSchema } from "@/lib/schema";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { token, ...values } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const parsed = newPasswordSchema.safeParse(values.values);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const { password } = parsed.data;

    const [existingToken] = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.token, token));

    if (!existingToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, existingToken.email));

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 404 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, existingUser.id));

    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, existingToken.id));

    return NextResponse.json({ success: "Password updated" }, { status: 200 });
  } catch (error) {
    console.error("New password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
