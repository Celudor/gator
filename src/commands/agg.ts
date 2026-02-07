import { scrapeFeeds } from "src/scrapefeeds";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error(`${cmdName} requires time between requests`);
    }
    const time_between_requests = parseDuration(args[0]);
    if (!time_between_requests) {
        throw new Error(`invalida format ${args[0]}- use format 1h 30m 15s or 3500ms`);
    }
    console.log(`Collecting feeds every ${args[0]}`);

    scrapeFeeds().catch(handleError);

    const interval = setInterval(()=>{
        scrapeFeeds().catch(handleError);
    }, time_between_requests);

    await new Promise<void>((resolve)=>{
        process.on("SIGINT", () => {
            console.log("Shutting donw feed aggregator...");
            clearInterval(interval);
            resolve();
        })
    });

    await scrapeFeeds();
}

function parseDuration(durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) return;
    if (match.length !== 3) return;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case "ms":
            return value;
        case "s":
            return value * 1000;
        case "m":
            return value * 1000 * 60;
        case "h":
            return value * 1000 * 60 * 60;
        default:
            return;
    }

}

function handleError(error: unknown) {
    console.error(`Error scraping feeds: ${error instanceof Error ? error.message : error}`);
}
