import {fetchFeed} from "../feed";
export async function handlerAgg(cmdName: string, ...args: string[]) {
    //if (args.length === 0) {
    //    throw new Error(`${cmdName} requires url`);
    //}
    //const url = args[0];
    const url = "https://www.wagslane.dev/index.xml";
    const feed = await fetchFeed(url);
    console.log(feed.channel.title);
    console.log(feed.channel.link);
    console.log(feed.channel.description);
    for (const item of feed.channel.item) {
        console.log(item.title);
        console.log(item.link);
        console.log(item.description);
        console.log(item.pubDate);
    }
}
