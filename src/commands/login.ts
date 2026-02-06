import { setUser } from "../config";
import { getUser } from "../lib/db/queries/users";


export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error(`${cmdName} requires username`);
    }
    //setUser(args[0]);
    //console.log(`User ${args[0]} has been set`);
    const username = args[0];
    const user = await getUser(username);
    if (typeof user === "undefined") {
        throw new Error(`User ${username} does not exist`);
    }
    setUser(user.name);
    console.log(`Logged as ${user.name}`);

}

