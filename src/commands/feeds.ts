import { listFeeds } from "../lib/db/queries/feeds";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feeds = await listFeeds(); 
    for (const feed of feeds) {
        console.log(`Name: ${feed.name}`);
        console.log(`URL: ${feed.url}`);
        console.log(`User: ${feed.user}`);
    }
}

