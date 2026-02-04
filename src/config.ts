import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName?: string;
}

export function setUser(name: string): void {
    const cfg = readConfig();
    cfg.currentUserName = name;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const cfgPath = getConfigFilePath();
    const data = fs.readFileSync(cfgPath, {encoding: 'utf-8'});
    return validateConfig(JSON.parse(data));
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const cfgPath = getConfigFilePath();
    const rawCfg = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };
        fs.writeFileSync(cfgPath, JSON.stringify(rawCfg, null, 2), {encoding: "utf-8"});
}

function validateConfig(rawConfig: any): Config {
    if (typeof rawConfig !== "object" || rawConfig === null) {
        throw new Error("Validataion failed: Not json object");
    }
    try {
        if (typeof rawConfig.db_url === "string" && (rawConfig.current_user_name === undefined || typeof rawConfig.current_user_name === "string")) {
            return {dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name};
        } else {
            throw new Error("Validation failed: Missing data");
        }
    } catch (err) {
        throw new Error(`Validataion failed: ${err}`);
    }
}

