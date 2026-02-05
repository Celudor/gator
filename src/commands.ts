import { readConfig, setUser } from "./config";
import {createUser, getUser, getUsers, clearUsers} from "./lib/db/queries/users";

type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
export type CommandsRegistry = Record<string, CommandHandler>;

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

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}
export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (cmdName in registry) {
        await registry[cmdName](cmdName, ...args);
    }
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("username is reqired");
    }
    const username = args[0];
    const user = await getUser(username);
    if (typeof user !== "undefined" && user.name === username) {
        throw new Error(`${username} alredy exist in db`);
    } else {
        const user = await createUser(username);
        setUser(user.name);
        console.log(`User: ${user.name} was created.`);
        console.log(user);
    }
}

export async function handlerReset(cmdName: string, ...args: string[]) {
    try {
        await clearUsers();
        console.log("All records were deleted from users");
    } catch {
        throw new Error("Can't remove records from users");
    }
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const current = readConfig().currentUserName;
    for (const user of users) {
        if (user.name === current) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
}

