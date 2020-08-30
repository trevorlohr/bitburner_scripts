export async function main(ns){
    let target = ns.args[0];
    while(true){
        let currentSec = ns.getServerSecurityLevel(target);
        let hackFlag = (ns.getServerMaxMoney(target) * .9 <= ns.getServerMoneyAvailable(target));
        if(hackFlag === true){
            await ns.hack(target);
        }
        else if(hackFlag === false && currentSec > ns.getServerMinSecurityLevel(target) + 5){
            await ns.weaken(target);
        }
        else if(hackFlag === false){
            await ns.grow(target);
        }
    }
}