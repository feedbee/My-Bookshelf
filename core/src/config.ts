import fs from "fs";

export let Config = JSON.parse(fs.readFileSync(__dirname + "/../config/config.json", "utf8"));
export default Config;