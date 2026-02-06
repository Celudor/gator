import { XMLParser } from "fast-xml-parser";
import { channel } from "node:diagnostics_channel";

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};


export async function fetchFeed(feedURL: string){
    console.log(feedURL);
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

    const response = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator"
        }
    });

    const feed = await response.text();
    const parser = new XMLParser();
    const data = parser.parse(feed);
    if ("rss" in data && "channel" in data["rss"]) {
        const channel = data["rss"]["channel"];
        if ("title" in channel && "link" in channel && "description" in channel) {
            const title = channel.title;
            const link = channel.link;
            const description = channel.description;
            if ("item" in channel && Array.isArray(channel.item)) {
                const items: RSSItem[] = []; 
                for (const item of channel.item) {
                    if ("title" in item && "link" in item && "description" in item && "pubDate" in item) {
                        items.push(
                            {
                                title: item.title,
                                link: item.link,
                                description: item.description,
                                pubDate: item.pubDate
                            }
                        );
                    }
                }
                const rssFeed: RSSFeed = {
                    channel: {
                        title: title,
                        link: link,
                        description: description,
                        item: items
                    }
                }
                return rssFeed;
            } else {
                const rssFeed: RSSFeed = {
                    channel: {
                        title: title,
                        link: link,
                        description: description,
                        item: []
                    }
                }
                return rssFeed;
            }
            
        } else {
            throw new Error("ldk");
        } 
    } else {
        throw new Error("channel missing in feed");
    }
}
