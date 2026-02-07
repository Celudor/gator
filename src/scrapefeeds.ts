import { fetchFeed } from "./feed";
import { getNextFeedToFetch, markFeedFeched } from "./lib/db/queries/feeds";
import { createPost } from "./lib/db/queries/posts";

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (!feed)  {
        console.log("No feeds");
        return;
    }
    await markFeedFeched(feed.id);
    const rssFeed = await fetchFeed(feed.url);
    for (const item of rssFeed.channel.item){
        //console.log(item.title);
        await createPost(feed.id, item);
    }
}
