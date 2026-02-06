import { deleteFeedFollow } from "src/lib/db/queries/feedfollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import type { User } from "src/lib/db/schema";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length < 1) {
        throw new Error(`${cmdName} requires url`);
    }
    const url = args[0];

    const feed = await getFeedByUrl(url);
    const result = await deleteFeedFollow(user.id, feed.id);
}

