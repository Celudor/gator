import { eq } from "drizzle-orm";
import {db} from "..";
import {feeds, users} from "../schema";

export async function createFeed(name: string, url: string, userId: string) {

    const [result] = await db.insert(feeds).values({
        name: name,
        url: url,
        userId: userId
    }).returning();
    return result;
}

export async function getUserFeeds(userId: string) {
    const [result] = await db.select().from(feeds).where(eq(feeds.userId, userId));
    return result;
}


export async function getFeeds() {
    const result = await db.select().from(feeds);
    return result;
}

export async function listFeeds() {
    const result = await db.select({
        name: feeds.name,
        url: feeds.url,
        user: users.name
    }).from(feeds).leftJoin(users, eq(feeds.userId, users.id))
    return result;
}
