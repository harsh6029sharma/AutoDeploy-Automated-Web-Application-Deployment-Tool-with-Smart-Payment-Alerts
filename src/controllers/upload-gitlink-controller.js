const path = require('path');
const fs = require('fs').promises;
const runCommand = require('../middleware/upload-gitlink-middleware')


const uploadGitlinkController = async(req,res)=>{
    
     const { repoUrl } = req.body;   

    if (!repoUrl) {
        return res.status(400).json({ message: "Error: 'repoUrl' is required in the request body." });
    }

    try {
        const repoName = path.basename(repoUrl, '.git');
        const cloneDir = path.join(__dirname, 'cloned_repos');
        const projectPath = path.join(cloneDir, repoName);

 
        const dockerImageName = repoName.toLowerCase();
        const dockerContainerName = `${dockerImageName}-container`;

        console.log(`[1/6] Starting deployment for: ${repoUrl}`);


        await fs.mkdir(cloneDir, { recursive: true });
        console.log(`[2/6] Base directory '${cloneDir}' is ready.`);


        console.log(`Checking for existing directory at '${projectPath}'...`);
        try {
            await fs.rm(projectPath, { recursive: true, force: true });
            console.log(`Removed existing directory.`);
        } catch (e) {
            console.log(`No existing directory to remove. Proceeding.`);
        }

    
        console.log(`[3/6] Cloning repository into '${projectPath}'...`);

        await runCommand(`git clone ${repoUrl} ${projectPath}`);

        console.log('Repository cloned successfully.');

        console.log(`[4/6] Building Docker image '${dockerImageName}'...`);
        await runCommand(`docker build -t ${dockerImageName} .`, { cwd: projectPath });
        console.log('Docker image built successfully.');

        
        console.log(`[5/6] Stopping and removing old container '${dockerContainerName}'...`);
        try {
            await runCommand(`docker stop ${dockerContainerName}`);
            await runCommand(`docker rm ${dockerContainerName}`);
            console.log('Old container stopped and removed.');
        } catch (error) {
            console.log('No existing container to stop/remove. This is normal for a first-time deployment.');
        }

        console.log(`[6/6] Running new Docker container '${dockerContainerName}'...`);
        
        await runCommand(`docker run -d --name ${dockerContainerName} -p 8080:3000 ${dockerImageName}`);
        console.log('Deployment successful!');

        res.status(200).json({
            message: 'Deployment successful!',
            containerName: dockerContainerName,
            imageName: dockerImageName,
            hostPort: 8080,
        });

    }catch(e){
        console.error('Deployment failed:', e);
        res.status(500).json({ message: 'Deployment failed.', e: e.message });
    }
}


module.exports = {uploadGitlinkController}
