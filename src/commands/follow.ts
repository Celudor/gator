import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feedfollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
    const username = readConfig().currentUserName;
    if (!username) {
        throw new Error("user not registered");
    }
    if (args.length < 1) {
        throw new Error(`${cmdName} requires url`);
    }
    const url = args[0];

    const user = await getUser(username);
    const feed = await getFeedByUrl(url);
    const result = await createFeedFollow(user.id, feed.id);
    console.log(`Feed name: ${result.feedName}`);
    console.log(`User name: ${result.userName}`);
}

