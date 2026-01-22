import './App.css';
import CreateJob from './CreateJob'
function App() {
 let jobs = [];
  return (
    <>
    <div className="App">
      <header className="App-header">
        <CreateJob jobs={jobs} />
    </header>
    </div>
    </>
  );
}

export default App;
