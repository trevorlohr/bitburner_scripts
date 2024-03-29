import { Server } from "Server.js";
import {getNumOfThreadsPerTarget} from "hackutility.js";
export function getServers(ns) {
    let res = [];
    let numOfTargets = ns.read("targets.txt").length;
    let servers = ns.getPurchasedServers();
    for (let each of servers){
        let totalRam = ns.getServerMaxRam(each);

        let numOfThreadsPerTarget = getNumOfThreadsPerTarget(ns, each, numOfTargets, "server-hack.js");
        let newServer = new Server(each,totalRam,numOfThreadsPerTarget);
        res.push(newServer);
    }
    return res;
}