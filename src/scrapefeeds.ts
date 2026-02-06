import { fetchFeed } from "./feed";
import { getNextFeedToFetch, markFeedFeched } from "./lib/db/queries/feeds";

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    await markFeedFeched(feed.id);
    const rssFeed = await fetchFeed(feed.url);
    for (const item of rssFeed.channel.item){
        console.log(item.title);
    }
}
