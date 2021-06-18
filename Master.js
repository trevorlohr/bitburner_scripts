//**************************//
    //*        Master.js        //
    //*  This script runs all   //
    //* processes for mechanics //
    //**************************//

    //takes args for reset reason
    //  nodes
    //  servers
    //  stock
    //  (empty)
    import { nodeReset, serverReset } from "masterutility.js";
    import { runHack, getNumOfThreadsPerTarget } from "hackutility.js";
    
    export async function main(ns) {
        let reason = ns.args[0];
        const processes = ns.ps("home");
            for (let i = 0; i < processes.length; ++i) {
                if(processes[i].filename !== "Master.js"){
                    ns.scriptKill(processes[i].filename, "home")
                }
            }
        if(reason === "xp"){
            let nodes = ns.read("foundnodes.txt").split(",");
            nodeReset(ns);
            serverReset(ns);
            await ns.sleep(10000);
            for(let each of nodes){
                ns.tprint(each);
                let ram =ns.getServerRam(each)[0];
                ns.scp("weak.js", "home", each);
                
                let threads = Math.floor(ram / ns.getScriptRam("weak.js", each));
                await runHack(ns, "weak.js", each, threads, "joesguns");
            }
            let homeRam = ns.getServerRam("home");
            let left = homeRam[0]- homeRam[1]
            await ns.run("weak.js",(Math.floor(left / ns.getScriptRam("weak.js", "home"))),"joesguns")
            ns.exit();
        }
        await ns.run("scanner.js", 1);
        await ns.sleep(8000);
        let homeRamInfo = ns.getServerRam("home");
        let totalRam = homeRamInfo[0];


        if (reason === "nodes") {
            ns.tprint("Resetting nodes.");
            nodeReset(ns);
            ns.scriptKill("node-hack.js", "home");
            await ns.run("nodes-process.js", 1);
        }
        if (reason === "servers") {
            ns.tprint("Resetting Servers.");
            serverReset(ns);
            await ns.run("servers-process.js", 1);
        }
        if (reason === "" || reason === undefined || reason === null) {
            ns.tprint("Resetting Servers and nodes.");
            nodeReset(ns);
            serverReset(ns);
            await ns.run("nodes-process.js", 1);
            await ns.run("servers-process.js", 1);
        }
        if (reason === "none") {
            await ns.run("nodes-process.js", 1);
            await ns.run("servers-process.js", 1);
        }
        if (reason === "stock") {
            if(ns.getServerRam("home")[0] - ns.getServerRam("home")[0] > ns.getScriptRam("stockmarket.js", "home")){
                await ns.run("stockmarket.js", 1);
            }
        }
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