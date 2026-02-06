import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/users";


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

