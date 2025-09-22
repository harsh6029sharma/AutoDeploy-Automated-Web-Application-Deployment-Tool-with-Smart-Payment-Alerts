const fs = require('fs');
const path = require('path');

function generateDockerFile(config, projectPath) {
  let dockerContent = '';

  if (config.language === 'nodejs') {
    dockerContent = `
    FROM node:18
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE ${config.port}
    CMD ["${config.startCommand.split(" ")[0]}", "${config.startCommand.split(" ")[1]}"]
    `;
  } 
  else if (config.language === 'python') {
    dockerContent = `
    FROM python:3.10
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    COPY . .
    EXPOSE ${config.port}
    CMD ["python", "${config.startCommand}"]
    `;
  }

  // Save Dockerfile in the project folder
  const dockerfilePath = path.join(projectPath, 'Dockerfile');
  fs.writeFileSync(dockerfilePath, dockerContent.trim());
  console.log(`Dockerfile generated at: ${dockerfilePath}`);
}

module.exports = { generateDockerFile };
