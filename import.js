let config = {
    rootUrl: 'https://trevorlohr.github.io/bitburner_scripts/',
    serverPrefix: 'trevorlohr',
  };
  /*
   * This will import all files listed in importFiles.
   */
  export async function main(ns) {
    let filesImported = await importFiles(ns);
    ns.tprint('='.repeat(20));
    // if (filesImported) {
    //   ns.tprint('Hey! Thank you for downloading the BitBurner Scripts.');
    //   ns.tprint(`You've installed these in the ${config.folder} directory.`);
    //   ns.tprint(
    //     `A good place to start is running \`run /${config.folder}/hax.js\``
    //   );
    // } else {
    //   ns.tprint(
    //     'You had some issues downloading files, please reach out to the repo maintainer or check your config.'
    //   );
    // }
  }
  
  async function importFiles(ns) {
    let files = [
      'buyservers.js',
      'deepscan.js',
      'hackutility.js',
      'Master.js',
      'masterutility.js',
      'newStock.js',
      'node-hack.js',
      'Node.js',
      'nodes-process.js',
      'scanner.js',
      'server-hack.js',
      'Server.js',
      'servers-process.js',
      'serverutility.js',
      'stockmarket.js',
      'weak.js',
      'remove.js',
      'import.js'
    ];
    let filesImported = true;
    for (let file of files) {
      let remoteFileName = `${config.rootUrl}${file}`;
      ns.tprint(`${remoteFileName}`)
      let result = await ns.wget(remoteFileName, `${file}`);
      filesImported = filesImported && result;
      ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
    }
    return filesImported;
  }
  
  export function getFolder() {
    return config.folder;
  }
  
  export function getServerPrefix() {
    return config.serverPrefix;
  }
  
  export function getMasterScript() {
    return `/${getFolder()}/Master.js`;
  }