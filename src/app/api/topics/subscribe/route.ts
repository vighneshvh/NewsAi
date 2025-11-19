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

    const { topics, action = "replace" } = await request.json();

    if (!Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: "Topics array is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 401 }
      );
    }

    if (action === "replace") {
      // Replace all topics (original behavior)
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
        { success: true, topics: insertedTopics.map((t) => t.topic) },
        { status: 200 }
      );
    } else if (action === "add") {
      // Add new topics (ignore duplicates)
      const insertedTopics = await db
        .insert(subscribedTopics)
        .values(
          topics.map((topic: string) => ({
            userId,
            topic,
          }))
        )
        .onConflictDoNothing()
        .returning();

      // Fetch all topics for the user
      const allUserTopics = await db
        .select()
        .from(subscribedTopics)
        .where(eq(subscribedTopics.userId, userId));

      return NextResponse.json(
        { success: true, topics: allUserTopics.map((t) => t.topic) },
        { status: 200 }
      );
    } else if (action === "remove") {
      // Remove specific topics
      const topicsToRemove = topics;

      await db
        .delete(subscribedTopics)
        .where(
          eq(subscribedTopics.userId, userId) &&
            (topicsToRemove.length === 1
              ? eq(subscribedTopics.topic, topicsToRemove[0])
              : undefined)
        );

      // Fetch remaining topics
      const remainingTopics = await db
        .select()
        .from(subscribedTopics)
        .where(eq(subscribedTopics.userId, userId));

      return NextResponse.json(
        { success: true, topics: remainingTopics.map((t) => t.topic) },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
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

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 401 }
      );
    }

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
