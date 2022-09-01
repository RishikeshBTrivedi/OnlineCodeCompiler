//this will geterate a file to be run on system
const fs = require("fs")
const path = require("path")
const dirCodes = path.join(__dirname,"codes")
const {v4:uuid} = require("uuid")//v4 of uuid renamed as uuid itself
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true})//if the codes folder does not exist then create one 
}
const generateFile = async (format , content) => {
    const jobId = uuid()
    const fileName = `${jobId}.${format}`//filename saved to id.cpp
    const filepath = path.join(dirCodes , fileName)
    await fs.writeFileSync(filepath , content)//wrriting the content inside the file
    return filepath
}

module.exports ={
    generateFile
}