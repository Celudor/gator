import { getFeedFollowsForUser } from "src/lib/db/queries/feedfollows";
import { type User } from "src/lib/db/schema";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    const results = await getFeedFollowsForUser(user.id);
    for (const result of results) {
        console.log(`Feed name: ${result.feedName}`);
        console.log(`User name: ${result.userName}`);
    }
}

