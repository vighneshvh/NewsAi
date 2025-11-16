import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { resetPasswordSchema } from "@/lib/schema";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return NextResponse.json({ success: "Reset email sent" }, { status: 200 });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
