import {setUser, readConfig} from "./config"
import {handlerLogin, registerCommand, runCommand, type CommandsRegistry } from "./commands"
import console from "node:console";

function main() {
    const cmdsRegistry: CommandsRegistry = {};
    registerCommand(cmdsRegistry, "login", handlerLogin);
    const args = process.argv.slice(2,);
    if (args.length === 0) {
        console.error("Command name expected.");
        process.exit(1);
    }
    try {
        runCommand(cmdsRegistry, args[0], ...args.slice(1,));
    } catch  (err) {
        console.error(err instanceof Error ? err.message : `Unknow error: ${err}`);
        process.exit(1);
    }


    const cfg = readConfig();
    console.log(cfg);
}

main();
