import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignInSchema } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedFields = SignInSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const { email, password } = validatedFields.data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
