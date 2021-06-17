export async function main(ns){
    const MONEY_THRESH = 500000000000;
    const MAXSHARES = 1000000;
    let getMyCash = () => {return ns.getServerMoneyAvailable("home")};
    let symbols = ["ECP", "MGCP", "BLD", "CLRK", "OMTK", "FSIG", "KGI", "FLCM", "STM", "DCOMM", "HLS", "VITA", "ICRS", "UNV", "AERO", "OMN", "SLRS", "GPH", "NVMD", "WDS", "LXO", "RHOC", "APHE", "SYSC", "CTK", "NTLK", "OMGA", "FNS", "SGC", "JGN", "CTYS", "MDYN", "TITN"];
    while(true){
        let totalStock = 0;
        for(let sym of symbols){
            let myCash = getMyCash();
            let price = ns.getStockPrice(sym);
            let pos = ns.getStockPosition(sym);
            
            let myShares = pos[0];
            let myAvgPrice = pos[1];
            // if(myCash < MONEY_THRESH){
            //     ns.exit();
            // }
            
            if(myAvgPrice * 1.10 < price && myShares > 0){
                ns.sellStock(sym,myShares);
            }
            if((myAvgPrice * .9 > price && myShares > 0) || myShares === 0){
                let numToBuy = MAXSHARES - myShares;
                if(numToBuy * price < getMyCash() - MONEY_THRESH){
                    ns.buyStock(sym,numToBuy);
                }
            }
            pos = ns.getStockPosition(sym)[0];
            totalStock = (pos * price) + totalStock
        }
        ns.print(`Total in stocks is ${totalStock}.`)
        await ns.sleep(5000);
    }
}