//Master runs this to ensure nodes are hacked, running latest scripts on best targets
import { Node } from "Node.js";
import { getNumOfThreadsPerTarget, runHack } from "hackutility.js";
export async function main(ns) {
  var allNodes = [];

  while (true) {
    let targets = ns.read("targets.txt");
    init();
    let numOfTargets = ns.read("targets.txt").split(",").length;
    for (let target of targets) {
      for (let node of allNodes) {
        ns.tprint(node.name)
        if (
          node.name=== "home" ||
          node.name.startsWith("Hack") ||
          ns.isRunning("node-hack.js", node.name, target)
        ) {
          continue;
        }
        if (ns.hasRootAccess(node.name)) {
          node.threadsPerTarget = getNumOfThreadsPerTarget(
            ns,
            node.name,
            numOfTargets,
            "node-hack.js"
          );
          await runHack(
            ns,
            "node-hack.js",
            node.name,
            node.threadsPerTarget,
            target
          );
        }
        else{
          crackNode(node);
          ns.scp("node-hack.js",node.name);
        }
      }
      await ns.sleep(20000);
    }
  }


  function init() {
    var foundNodes = ns.read("foundnodes.txt");
    for (let node of foundNodes.split(",")) {
      let totalRam = ns.getServerRam(node);
      let numOfTargets = ns.read("targets.txt").length;

      let numOfThreadsPerTarget = getNumOfThreadsPerTarget(
        ns,
        node,
        numOfTargets,
        "node-hack.js"
      );
      node = new Node(node, totalRam, numOfThreadsPerTarget);
      allNodes.push(node);
    }
  }

  function crackNode(node) {
    let ports = ns.getServerNumPortsRequired(node.name);
    if (ns.fileExists("httpworm.exe")) {
      ns.httpworm(node.name);
      ports--;
    }
    if (ns.fileExists("sqlinject.exe")) {
      ns.sqlinject(node.name);
      ports--;
    }
    if (ns.fileExists("relaysmtp.exe")) {
      ns.relaysmtp(node.name);
      ports--;
    }
    if (ns.fileExists("ftpcrack.exe")) {
      ns.ftpcrack(node.name);
      ports--;
    }
    if (ns.fileExists("brutessh.exe")) {
      ns.brutessh(node.name);
      ports--;
    }
    if (ports <= 0) {
      ns.nuke(node.name);
    }
  }
}
