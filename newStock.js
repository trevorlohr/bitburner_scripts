export async function main(ns){
	const MONEY_THRESH = 0;//500000000000;
	const MAXSHARES = 1000000;
	let getMyCash = () => {return ns.getServerMoneyAvailable('home');};
	let symbols = ['ECP', 'MGCP', 'BLD', 'CLRK', 'OMTK', 'FSIG', 'KGI', 'FLCM', 'STM', 'DCOMM', 'HLS', 'VITA', 'ICRS', 'UNV', 'AERO', 'OMN', 'SLRS', 'GPH', 'NVMD', 'WDS', 'LXO', 'RHOC', 'APHE', 'SYSC', 'CTK', 'NTLK', 'OMGA', 'FNS', 'SGC', 'JGN', 'CTYS', 'MDYN', 'TITN'];
	while(true){
		let totalStock = 0;
		for(let sym of symbols){
			//let myCash = getMyCash();
			let price = ns.getStockPrice(sym);
			let pos = ns.getStockPosition(sym);
            
			let myShares = pos[0];
			ns.print(`POS for ${sym} is ${myShares}`);
			let myAvgPrice = pos[1];
			// if(myCash < MONEY_THRESH){
			//     ns.exit();
			// }

			if(myAvgPrice * 1.10 < price && myShares > 0){
				ns.sellStock(sym,myShares);
			}

			if(((myAvgPrice * .9 > price && myShares > 0) || myShares === 0) && ns.getStockForecast(sym) >= .4){
				let numToBuy = Math.floor(getMyCash() / price) - 20;
				ns.print(`Num to buy is ${numToBuy}`);
				if(numToBuy * price < getMyCash() - MONEY_THRESH && numToBuy <= ns.getStockMaxShares(sym) && numToBuy > 0){
					ns.buyStock(sym,numToBuy);
				}
			}
			pos = ns.getStockPosition(sym)[0];
			totalStock = (pos * price) + totalStock;
		}
		ns.print(`Total in stocks is ${totalStock}.`);
		await ns.sleep(5000);
	}
}