  export async function main(ns) {
    let exclude = [
        'remove.js',
        'import.js'
      ];
      
      var scripts = ls(getHostname(), "script");
      for (let script in scripts) {
          if (script in exclude){
              continue;
          }
          if (rm(script))
              ns.tprint(`✔️ ${script} deleted`);
          else{
              ns.tprint(`❌ ${script} not deleted. `);
          }
      }
    }