const { exec } = require('child_process');

function runCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}\n${stderr}`);
                return reject(error);
            }
            resolve(stdout.trim());
        });
    });
    
}

module.exports = runCommand
