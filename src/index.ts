import {setUser, readConfig} from "./config"
function main() {
    setUser("Lukasz");
    const cfg = readConfig();
    console.log(cfg);
}

main();
