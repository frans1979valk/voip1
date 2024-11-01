const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function commitChanges() {
  try {
    await runCommand('git add .');
    rl.question('Enter commit message: ', async (message) => {
      await runCommand(`git commit -m "${message}"`);
      console.log('Changes committed successfully.');
      rl.close();
    });
  } catch (error) {
    console.error('Failed to commit changes:', error);
    rl.close();
  }
}

async function checkStatus() {
  await runCommand('git status');
  rl.question('Do you want to commit changes? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      commitChanges();
    } else {
      console.log('No changes committed.');
      rl.close();
    }
  });
}

console.log('Development Helper Script');
checkStatus();
