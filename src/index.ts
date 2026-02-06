import { 
    registerCommand, 
    runCommand, 
    type CommandsRegistry } from "./commands"
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handlerReset } from "./commands/reset";
import { handlerUsers } from "./commands/users";
import { handlerAgg } from "./commands/agg";
import { handlerAddFeed } from "./commands/addfeed";
import { handlerFeeds } from "./commands/feeds";
import { handlerFollow } from "./commands/follow";
import { handlerFollowing } from "./commands/following";
import { middlewareLoggedIn } from "./middleware";
import { handlerUnfollow } from "./commands/unfollow";

async function main() {
    const cmdsRegistry: CommandsRegistry = {};
    registerCommand(cmdsRegistry, "login", handlerLogin);
    registerCommand(cmdsRegistry, "register", handlerRegister);
    registerCommand(cmdsRegistry, "reset", handlerReset);
    registerCommand(cmdsRegistry, "users", handlerUsers);
    registerCommand(cmdsRegistry, "agg", handlerAgg);
    registerCommand(cmdsRegistry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(cmdsRegistry, "feeds", handlerFeeds);
    registerCommand(cmdsRegistry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(cmdsRegistry, "following", middlewareLoggedIn(handlerFollowing));
    registerCommand(cmdsRegistry, "unfollow", middlewareLoggedIn(handlerUnfollow));

    const args = process.argv.slice(2,);
    if (args.length === 0) {
        console.error("Command name expected.");
        process.exit(1);
    }
    try {
        await runCommand(cmdsRegistry, args[0], ...args.slice(1,));
    } catch  (err) {
        console.error(err instanceof Error ? err.message : `Unknow error: ${err}`);
        process.exit(1);
    }


    //const cfg = readConfig();
    //console.log(cfg);

    process.exit(0);
}

main();
