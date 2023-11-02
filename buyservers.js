export async function main(ns) {
  let moneyCheck = (gb) => {
    return ns.getServerMoneyAvailable("home") - SAFETY_THRESH >= gb * 55000;
  };
  let gbCheck = () => {
    return topGB < ns.getPurchasedServerMaxRam();
  };

  const SAFETY_THRESH = 100000000;

  if(!moneyCheck(64)){ns.exit()}
  let servers = ns.getPurchasedServers();
  let numOfServers = servers.length;
  let raiseGB = (num) => {return num * 2};
  servers = servers.map(x => {
    return { name: x, ram: ns.getServerMaxRam(x)};
  });
  if(servers.length === 0 && moneyCheck(64) === true){
    ns.purchaseServer("Hack",64);
    servers = ns.getPurchasedServers();
  }
  let topGB = Math.max.apply(
    Math,
    servers.map(function(o) {
      return o.ram;
    })
  );

  if(topGB < 64){
    ns.exit();
  }
  let findNumToBuy = (list)=>list.filter(x => x.ram < topGB);
  let numToBuy = findNumToBuy(servers);

  if(numToBuy.length === 0 && servers.length === 25){
    let res = gbCheck();
    if(res === true){
      topGB = raiseGB(topGB);
      ns.tprint(topGB)

      res = gbCheck();
      if(res === true){
        numToBuy = servers;
      }
    }
    else{
      ns.print("Max servers. Max RAM.");
    }
  }
  if(numToBuy.length === 0 && numOfServers === 0){
    while(numOfServers < 25 && moneyCheck(topGB)){
      ns.purchaseServer("Hack",topGB)
      numOfServers++;
    }
    ns.exit();
  }

  if (numOfServers < 25 || numToBuy.length > 0 || gbCheck(topGB)) {
    for (let weakServer of numToBuy) {
      if (moneyCheck(topGB) && topGB > weakServer.ram) {
        ns.killall(weakServer.name);
        await ns.sleep(7500);
        ns.deleteServer(weakServer.name);
        ns.purchaseServer(weakServer.name,topGB)
      }
      else{
        ns.exit()
      }
    }
  }else{
    ns.exit();
  }
}
