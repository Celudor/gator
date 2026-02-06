import { clearUsers } from "../lib/db/queries/users";


export async function handlerReset(cmdName: string, ...args: string[]) {
    try {
        await clearUsers();
        console.log("All records were deleted from users");
    } catch {
        throw new Error("Can't remove records from users");
    }
}

