import { setUser } from "../config";
import { getUser, createUser } from "../lib/db/queries/users";


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

