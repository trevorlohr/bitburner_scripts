  export async function main(ns) {
    let exclude = [
        'remove.js',
        'import.js'
      ];
      
      var scripts = ns.ls(ns.getHostname(), ".js");
      for (let script in scripts) {
          if (scripts[script] in exclude){
              continue;
          }
          if (ns.rm(scripts[script]))
              ns.tprint(`✔️ ${scripts[script]} deleted`);
          else{
              ns.tprint(`❌ ${scripts[script]} not deleted. `);
          }
      }
    }