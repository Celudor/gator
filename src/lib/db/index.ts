import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "src/config";

const cfg = readConfig();
const conn = postgres(cfg.dbUrl);
export const db = drizzle(conn, {schema});


