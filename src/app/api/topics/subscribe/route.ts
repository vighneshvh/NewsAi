import { auth } from "@/auth";
import { db } from "@/db";
import { subscribedTopics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topics } = await request.json();

    if (!Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: "Topics array is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id || session.user.email;

    await db
      .delete(subscribedTopics)
      .where(eq(subscribedTopics.userId, userId));

    const insertedTopics = await db
      .insert(subscribedTopics)
      .values(
        topics.map((topic: string) => ({
          userId,
          topic,
        }))
      )
      .returning();

    return NextResponse.json(
      { success: true, topics: insertedTopics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error subscribing to topics:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to topics" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || session.user.email;

    const userTopics = await db
      .select()
      .from(subscribedTopics)
      .where(eq(subscribedTopics.userId, userId));

    console.log(userTopics);

    return NextResponse.json(
      { topics: userTopics.map((t) => t.topic) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
