import { RSSItem } from "src/feed";
import { db } from "..";
import { posts, feeds,  feedFollows } from "../schema";
import { desc , eq} from "drizzle-orm";

export async function createPost(feedId: string, post: RSSItem ) {
    const [result] = await db.insert(posts).values({
        title: post.title,
        url: post.link,
        description: post.description,
        publishedAt: new Date(post.pubDate),
        feedId: feedId
    }).returning();

    return result;
}

export async function getPostsForUser(userId: string, limit: number) {
    const result = await db.select({
        title: posts.title,
        url: posts.url,
        description: posts.description
    })
    .from(posts)
    .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
    return result;
}
