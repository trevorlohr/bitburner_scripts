export async function main(ns) {
  let foundnodes = [];
  let origin = ns.getHostname();
  let stack = [];
  stack.push(origin);
  let crackedServers = [];
  const MONEY_THRESH = 0;

  while (stack.length > 0) {
    let node = stack.pop();
    if (foundnodes.includes(node)) {
      //Do nothing => "continue"
    } else {
      foundnodes.push(node);

      let nextNodes = ns.scan(node);
      for (let i = 0; i < nextNodes.length; ++i) {
        stack.push(nextNodes[i]);
      }
    }
  }
  for (let node of foundnodes) {
    if (
      ns.getServerMaxMoney(node) > MONEY_THRESH &&
      ns.getServerRequiredHackingLevel(node) <= ns.getHackingLevel()
    ) {
      crackedServers.push(node);
    }
  }
  let maxMoney = [];
  for (let each of crackedServers) {
    let money = ns.getServerMaxMoney(each);
    if(ns.getServerRequiredHackingLevel(each) <= ns.getHackingLevel() && ns.hasRootAccess(each)){
      maxMoney.push({ name: each, maxMoney: money });
    }
  }
  crackedServers = maxMoney.sort((a, b) => {
    if (a.maxMoney < b.maxMoney) return -1;
    if (a.maxMoney > b.maxMoney) return 1;
    return 0;
  });
if (maxMoney.length) {
  crackedServers = maxMoney.slice(-3).map(x => {
    return x.name;
  });
}
await ns.write("targets.txt", String(crackedServers), "w");
await ns.write("foundnodes.txt", String(foundnodes), "w");
}