let config = {
    rootUrl: 'https://trevorlohr.github.io/bitburner_scripts/',
    serverPrefix: 'trevorlohr',
  };
  /*
   * This will import all files listed in importFiles.
   */
  export async function main(ns) {
    await importFiles(ns);
    ns.tprint('='.repeat(20));
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
      'import.js',
      'new.js'
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