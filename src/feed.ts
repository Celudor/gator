import { XMLParser } from "fast-xml-parser";

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
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

    const response = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator",
            accept: "application/rss+xml",
        }
    });

    if (!response.ok) {
        throw new Error(`Failed fetch ${response.status} ${response.statusText}`);
    }

    const feed = await response.text();
    const parser = new XMLParser();
    const data = parser.parse(feed);

    const channel = data.rss?.channel;

    if(!channel) {
        throw new Error("failed to parse channel");
    }

    if(!channel.title || !channel.link || !channel.description || !channel.item) {
        throw new Error("failed to prase channel");
    }

    const items: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];
    const rssItems: RSSItem[] = [];

    for (const item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }

        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate
        });

    }

    const rssFeed: RSSFeed = {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: rssItems
        }
    };

    return rssFeed;
}
