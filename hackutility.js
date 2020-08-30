export function getNumOfThreadsPerTarget(ns, node, numOfTargets, script) {
  
    var scriptRam = ns.getScriptRam(script, node);
    var ramInfo = ns.getServerRam(node);
    var ram = ramInfo[0];
    var divider = ram / numOfTargets;
    return Math.floor(divider / scriptRam);

}

export async function runHack(ns,script, node, numOfThreads, target) {
    if(!numOfThreads > 0){
        return 0;
    }
    let res = await ns.exec(script,node,numOfThreads, target);
    if(res === true){
        ns.tprint("runHack succeeded on " + node + " for "+ target);
    }else{
        ns.tprint("runHack failed on " + node + " for "+ target);
    }
}


export function crackNode(node){
        if (ns.fileExists("httpworm.exe")) {
            ns.httpworm(node.name);
        }
        if (ns.fileExists("sqlinject.exe")) {
            ns.sqlinject(node.name);
        }
        if (ns.fileExists("relaysmtp.exe")) {
            ns.relaysmtp(node.name);
        }
        if (ns.fileExists("ftpcrack.exe")) {
            ns.ftpcrack(node.name);
        }
        if (ns.fileExists("brutessh.exe")) {
            ns.brutessh(node.name);
        }
        ns.nuke(node.name);
}