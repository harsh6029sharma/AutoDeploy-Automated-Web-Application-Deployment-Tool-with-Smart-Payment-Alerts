const {generateDockerFile} = require('../utilities/dockerFileGenerator')
const fs = require('fs')
const path = require('path')

const generateDockerController = async(req,res)=>{
    try {
        // configuration taking from user or frontend-> bhai sahi config. daliyo
        const {projectName, language , port, startCommand} = req.body

        const projectPath = path.join(__dirname, '../cloned_projects',projectName)

        // generate the docker file 
        generateDockerFile({projectName,language,port, startCommand},projectPath)

        return res.status(200).json({
            message:'Docker file generated successfully!',
            project:projectName
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal server error while creating docker file!',
            error:error.message
        })
    }
}

module.exports = {generateDockerController}