import { runHack } from "hackutility.js";

export async function main(ns) {
    await ns.run("scanner.js", 1);
    await ns.sleep(8000);
    let homeRamInfo = ns.getServerMaxRam("home");
    let totalRam = homeRamInfo;
    let usedRam = ns.getServerUsedRam("home")
    let targets = ns.read("targets.txt").split(",");
    let ramLeft = totalRam - usedRam;
    let threads = Math.floor(
        Math.floor((ramLeft * 0.8) / targets.length) /
        ns.getScriptRam("node-hack.js", "home")
    );
    for (let target of targets) {
        ns.tprint(target);
        await runHack(ns, "node-hack.js", "home", threads, target);
        await ns.sleep(2000);
    }
    if(ns.getServerMaxRam("home") - ns.getServerUsedRam("home") > ns.getScriptRam("stockmarket.js", "home")){
        await ns.run("stockmarket.js", 1);
    }
}
