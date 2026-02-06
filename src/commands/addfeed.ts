import {readConfig} from "../config";
import {getUser} from "../lib/db/queries/users";
import { createFeed } from "../lib/db/queries/feeds";
import {type User, type Feed} from "../lib/db/schema";
import { createFeedFollow } from "src/lib/db/queries/feedfollows";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length < 2) {
        throw new Error(`${cmdName} requires feed name and feed url`);
    }
    const feedName = args[0];
    const feedUrl = args[1];
    const username = readConfig().currentUserName;
    if (!username) {
        throw new Error("user not registered");
    }
    const user = await getUser(username);
    const feed = await createFeed(feedName, feedUrl, user.id);
    await createFeedFollow(user.id, feed.id);
    printFeed(user, feed);

}

function printFeed(user: User, feed: Feed) {
    console.log(feed.name);
    console.log(user.name);
}

