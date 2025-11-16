CREATE TABLE "subscribed_topics" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"topic" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscribed_topics" ADD CONSTRAINT "subscribed_topics_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "subscribed_topics" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "subscribed_topics_userId_topic_index" ON "subscribed_topics" USING btree ("userId","topic");