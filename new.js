export async function main(ns) {
    await ns.run("scanner.js", 1);
    await ns.sleep(8000);
    let homeRamInfo = ns.getServerRam("home");
    let totalRam = homeRamInfo[0];
    let targets = ns.read("targets.txt").split(",");
    let ramLeft = totalRam - homeRamInfo[1];
    let threads = Math.floor(
        Math.floor((ramLeft * 0.8) / targets.length) /
        ns.getScriptRam("node-hack.js", "home")
    );
    for (let target of targets) {
        ns.tprint(target);
        await runHack(ns, "node-hack.js", "home", threads, target);
        await ns.sleep(2000);
    }
    if(ns.getServerRam("home")[0] - ns.getServerRam("home")[0] > ns.getScriptRam("stockmarket.js", "home")){
        await ns.run("stockmarket.js", 1);
    }
}