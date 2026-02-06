import { createFeedFollow } from "src/lib/db/queries/feedfollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import type { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length < 1) {
        throw new Error(`${cmdName} requires url`);
    }
    const url = args[0];

    const feed = await getFeedByUrl(url);
    const result = await createFeedFollow(user.id, feed.id);
    console.log(`Feed name: ${result.feedName}`);
    console.log(`User name: ${result.userName}`);
}

