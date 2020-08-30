export function serverReset(ns){
    let servers = ns.getPurchasedServers();
    for (let server of servers) {
        if(server !== "home"){
            ns.killall(server);
        }
    }
}
export function nodeReset(ns){
    let nodes = ns.read("foundnodes.txt");
    for (let node of nodes.split(",")) {
        if(ns.hasRootAccess(node)===true && node !== "home"){
            ns.killall(node);
        }
    }
}