import { readConfig } from "src/config";
import { getFeedFollowsForUser } from "src/lib/db/queries/feedfollows";
import { getUser } from "src/lib/db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]) {
    const username = readConfig().currentUserName;
    if (!username) {
        throw new Error("user not registered");
    }

    const user = await getUser(username);
    const results = await getFeedFollowsForUser(user.id);
    for (const result of results) {
        console.log(`Feed name: ${result.feedName}`);
        console.log(`User name: ${result.userName}`);
    }
}

