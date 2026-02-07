import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/lib/db/schema";

export async function handlerBrowser(cmdName: string, user: User, ...args: string[]) {
   const limit = args.length < 1 ? 2 : parseInt(args[0]);
   const posts = await getPostsForUser(user.id, limit);


   for (const post of posts) {
       console.log(post.title)
   }
}
