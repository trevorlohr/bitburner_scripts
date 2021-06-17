export async function main(ns) {
    while (true) {
        await ns.run("deepscan.js", 1);
        await ns.sleep(10000);
    }
}