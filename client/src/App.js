import React from "react"
import './App.css';
import axios from "axios"

function App() {
  const [code , changeCode] = React.useState("");
  const [language , setLanguage] = React.useState("cpp");
  const [out , setOut] = React.useState("")
 const handleSubmit = async() =>{
   //axios sending data to the backend 
   const payload = {
     language:language,
     code
   }
   try{
      
      const outp = await axios.post("http://localhost:5000/run" , payload)
      console.log(outp.data)
      setOut(outp.data.output)
      console.log("Output -> "+out)
    
   }catch(err){
      console.log(err.response)
      setOut("Error in Code")
   }
 }
  return (
    <div className="App">
      {/* <div className="area" >
                <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>

                </ul> */}
                <h1 className = "head">Online Code Compiler</h1>
      <h2 className = "head">Created By Rishikesh!</h2>
      {/* Inline Elements therefore using Extra Div */}
      <div>
        <label className="selectLang">Select Language: </label>
        <select
        className="selectContent"
        value = {language}
        onChange = {(event) =>{
            setLanguage(event.target.value)
            console.log(event.target.value)
        }}>
          {/* cpp and py are key values for c++ and python respectively */}
          <option className = "options" value = "cpp">C++</option>
          <option className = "options" value = "py">Python</option>
        </select>
      </div>
      <br/>
      <textarea className = "codeArea" rows = "15" cols = "75" value = {code} onChange = {(event) => {
        changeCode(event.target.value)
      }}></textarea>
      <br/>
      <button className = "submitBtn" onClick = {handleSubmit}>Submit Code</button>
      <br/>
      <hr></hr>
      <h1 className="head2" >Output</h1>
      <p className = "output"value = {out}>{out}</p>
      <div class="context">
        
    </div>
        </div >
      


    
    // </div>
  );
}

export default App;
