export async function main(ns){
    let target = ns.args[0];
    while(true){
        let currentSec = ns.getServerSecurityLevel(target);
        if(currentSec > ns.getServerMinSecurityLevel(target) + 5){
            await ns.weaken(target);
        }
        else{
            await ns.grow(target);
        }
    }
}