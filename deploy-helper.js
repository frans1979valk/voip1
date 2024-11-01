const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function listChangedFiles() {
  // In een echte Git-omgeving zou dit `git status` gebruiken
  console.log("Gewijzigde bestanden (simulatie):");
  console.log("1. src/module1.js");
  console.log("2. src/module2.js");
  console.log("3. public/index.html");
}

function prepareDeployPackage(files) {
  console.log("Voorbereiden van deploy pakket...");
  // Hier zou u de geselecteerde bestanden kopiëren naar een deploy directory
  console.log("Deploy pakket voorbereid met de volgende bestanden:");
  files.forEach(file => console.log(file));
}

function simulateUpload() {
  console.log("Simuleren van upload naar server...");
  // Hier zou u de bestanden daadwerkelijk uploaden, bijvoorbeeld via FTP of SCP
  console.log("Upload voltooid (gesimuleerd).");
}

async function incrementalDeploy() {
  listChangedFiles();
  
  rl.question('Voer de nummers in van de bestanden die u wilt deployen (gescheiden door komma\'s): ', (answer) => {
    const selectedFiles = answer.split(',').map(num => num.trim());
    const filesToDeploy = selectedFiles.map(num => {
      switch(num) {
        case '1': return 'src/module1.js';
        case '2': return 'src/module2.js';
        case '3': return 'public/index.html';
        default: return null;
      }
    }).filter(file => file !== null);

    prepareDeployPackage(filesToDeploy);
    simulateUpload();

    rl.close();
  });
}

console.log('Incrementele Deploy Helper');
incrementalDeploy();
