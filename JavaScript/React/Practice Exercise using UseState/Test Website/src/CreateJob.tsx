import React, {useState} from 'react'

const CreateJob = () =>{
  let [jobCounter,setJobCounter] = useState(0)
  const [bots, setBotValues] = useState([{id:1, botname: "Extraction Emails", status: "Running"},
  {id:2, botname: "Sending Email Notifications", status: "Completed"},
  {id:3, botname: "Read Emails", status: "Stopped"}])

  const handleClickEvent = () =>{
    setJobCounter(jobCounter+1)
    console.log('Run job', jobCounter)
  }

  return(
    <>
    <div className="border border-3 border-lime-300 bg-slate-600 rounded-md p-5">
    <h1 className="text-lime-400 text-4xl">Bots running in Production are: {jobCounter}</h1>
    <br/>
    <button className="border text-slate-500 border-4 border-lime-300 p-4 bg-gray-100 rounded-lg" onClick={handleClickEvent} value="Run Job">Run Job</button>
    <br/> <br/>
    <ul>
    {
      bots.map(({id,botname,status})=><li><span>{id}-{botname}-{status}</span> <button className="border border-4 border-lime-300 rounded-lg p-4 bg-gray-100 text-slate-500">Trigger</button></li>)
    }
    </ul>
    </div>
    </>
  );
};

export default CreateJob;
