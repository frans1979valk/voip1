const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SERVER_INFO = {
  host: 'your_server_ip',
  user: 'your_username',
  path: '/path/to/your/app/on/server'
};

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

async function getChangedFiles() {
  const output = await runCommand('git status --porcelain');
  return output.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.slice(3).trim());
}

async function stageFiles(files) {
  for (const file of files) {
    await runCommand(`git add "${file}"`);
  }
}

async function commitChanges(message) {
  await runCommand(`git commit -m "${message}"`);
}

async function deployToServer(files) {
  for (const file of files) {
    const command = `scp ${file} ${SERVER_INFO.user}@${SERVER_INFO.host}:${SERVER_INFO.path}/${file}`;
    console.log(`Uploading ${file}...`);
    await runCommand(command);
  }
  console.log('Deployment complete!');
}

async function incrementalDeploy() {
  try {
    const changedFiles = await getChangedFiles();
    if (changedFiles.length === 0) {
      console.log('No changes detected.');
      rl.close();
      return;
    }

    console.log('Changed files:');
    changedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    rl.question('Enter the numbers of the files you want to deploy (comma-separated), or "all" for all files: ', async (answer) => {
      let filesToDeploy;
      if (answer.toLowerCase() === 'all') {
        filesToDeploy = changedFiles;
      } else {
        const selectedIndices = answer.split(',').map(num => parseInt(num.trim()) - 1);
        filesToDeploy = selectedIndices.map(index => changedFiles[index]).filter(file => file);
      }

      if (filesToDeploy.length === 0) {
        console.log('No files selected for deployment.');
        rl.close();
        return;
      }

      await stageFiles(filesToDeploy);
      
      rl.question('Enter a commit message: ', async (message) => {
        await commitChanges(message);
        console.log('Changes committed.');

        rl.question('Do you want to deploy these changes to the server? (y/n): ', async (deploy) => {
          if (deploy.toLowerCase() === 'y') {
            await deployToServer(filesToDeploy);
          } else {
            console.log('Deployment cancelled.');
          }
          rl.close();
        });
      });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    rl.close();
  }
}

console.log('Incremental Deployment Helper');
incrementalDeploy();
