const express = require("express")
const bodyParser = require("body-parser")
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const {generateFile} = require("./generateFile")
const { executeCpp } = require("./executeCpp")
const mongoose = require("mongoose")
const cors = require ("cors")//cors would allow sharing of data from different ports (3000,5000)
const { executePython } = require("./executePython")
const Job = require("./models/Job")

//we require a Database to store the jobids and the output along with the execution time
//this will allow us to have jobs scheduled to have less workload
mongoose.connect("mongodb://localhost:27017/codeDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error) => {
    if(error){
    console.error(error)
    process.exit(1)
    }
    console.log("Successfully Connected to mongoDB")
})
const app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/" , (req , res) => {
    res.send("Created by Rishikesh")
})
app.post("/run" , async (req , res , next) => {
    //setting up c++ as default language
    
    const {language = "cpp" , code} = req.body//newer es6 format
    console.log(language , code.length)
    if(code === undefined){
        return res.status(400).json({success: false , error:"Empty Code Body"})
    }
    let job
    try {
        const filepath = await generateFile(language, code);
        job = await new Job ({
            language:language,
            filepath:filepath
        }).save()
        const jobId = job["_id"]
        console.log(job)
        
        
        let output
        job["startedAt"] = new Date()
        let start = window.performance.now();
        if(language === "cpp")
        {
            output = await executeCpp(filepath)
        }else {
            output = await executePython(filepath)
        }
        let end = window.performance.now();
        console.log(`Execution time: ${end - start} ms`);
        return res.json({filepath , output})
        
    }catch(error){
        
        res.status(500).json({error})
    }
        //how do we run the file
        //1. go inside codes folder
        //2. write in the terminal g++ <filename>.cpp
        //3. writw ./a.exe in the terminal to get output
        //Note we would combine step 2 and 3 -> g++ <filename>.cpp && ./a.exe
        //Now we would implement the above steps in js code
    
})
app.listen(5000 , () => {
    console.log("Server Running Listening on port 5000")
})