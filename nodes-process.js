//Master runs this to ensure nodes are hacked, running latest scripts on best targets
import { Node } from "Node.js";
import { getNumOfThreadsPerTarget, runHack } from "hackutility.js";
export async function main(ns) {
  var ignoredNodes = [];
  const HOME = ["home"];
  var allNodes = [];
  var crackedNodes = [];

  init();
  while (true) {
    let targets = ns.read("targets.txt");
    let numOfTargets = ns.read("targets.txt").split(",").length;

    let needToCrack = checkForNewToCrack(allNodes);

    if (needToCrack.length > 0) {
      for (let each of needToCrack) {
        ns.tprint("Need to crack" + each);

        crackNode(each);
        crackedNodes.push(each);
      }
    }
    ignoredNodes = [];
    ignoredNodes.push(ns.getPurchasedServers());
    ignoredNodes.push(HOME);
    //check that nodes are hacking targets
    for (let each of crackedNodes) {
      ns.scp("node-hack.js", each.name);
      crackNode(each);

      for (let target of targets.split(",")) {
        if (
          each.name === "home" ||
          each.name.startsWith("Hack") ||
          ns.isRunning("node-hack.js", each.name, target)
        ) {
          continue;
        }
        else{
            each.threadsPerTarget = getNumOfThreadsPerTarget(
                ns,
                each.name,
                numOfTargets,
                "node-hack.js"
              );
              await runHack(
                ns,
                "node-hack.js",
                each.name,
                each.threadsPerTarget,
                target
              );
        }

        
      }
    }
    crackedNodes = [];
    await ns.sleep(20000);
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

  function checkForNewToCrack(nodes) {
    let res = [];
    for (let node of nodes) {
      if (ns.hasRootAccess(node.name) === true) {
        crackedNodes.push(node);
      } else if (
        ns.getServerRequiredHackingLevel(node.name) <= ns.getHackingLevel() &&
        ns.hasRootAccess(node.name) === false
      ) {
        res.push(node);
      }
    }
    return res;
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
