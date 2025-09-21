const fs = require('fs')
const path = require('path')
const simpleGit = require('simple-git');
const { gitlinkSave } = require('../models/gitlinkQuery');
simpleGit().clean(simpleGit.CleanOptions.FORCE);

const uploadGitlinkController = async (req, res) => {

    try {

        const { repoUrl } = req.body

        if (!repoUrl) {
            return res.status(400).json({
                success: false,
                message: 'Repo url required!'
            })
        }

        const rootDir = path.resolve(__dirname, '../')
        const clonedProjectsDir = path.join(rootDir, 'cloned_projects')

        // Agar "cloned_Projects" folder exist nahi karta toh banao
        if (!fs.existsSync(clonedProjectsDir)) {
            fs.mkdirSync(clonedProjectsDir);
        }

        const repoName = path.basename(repoUrl, '.git')

        const clonePath = path.join(clonedProjectsDir, repoName)

        // Agar same repo already exist hai
        if (fs.existsSync(clonePath)) {
            return res.status(400).json({
                success: false,
                message: "Repo already cloned!",
            });
        }


        const git = simpleGit()

        //clone command
        await git.clone(repoUrl, clonePath)

        await gitlinkSave(1, repoUrl, 'nil')

        res.status(201).json({
            success: true,
            message: 'repo cloned successfully!'
        })

        // if folder does not exist then create
        if (!fs.existsSync(folderPath)) {
            fs.mkdir(folderPath)
            console.log('project cloned and saved in cloned_projects folder successfully!');
        }
        else {
            console.log('folder already exist');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'error while cloning repo...'
        })
    }

}

module.exports = uploadGitlinkController