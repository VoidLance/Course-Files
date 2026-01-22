// import logo from './logo.svg';
import './App.css';
import './test.js';
import {useEffect} from 'react';
import {internalFunction} from './test.js';
import MmainContent from './test.js';


function App() {
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerText = greetUser("Visitor");
    }
  }, []); // Empty dependency array ensures this runs once after the component mounts.

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React App</h1>
        <p>Welcome to my first React application!</p>
      </header>
      <p className="App-intro border-r-green-200 border-4 p-4 m-4 rounded-lg bg-blue-100 text-blue-800 border-b-green-200 border-t-slate-400 border-l-slate-400">
        This is a simple React app to demonstrate the structure of a React component.
      </p>
      <button onClick= {internalFunction} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
        Click Me
      </button>
      <button onClick={ () => {
        const content = displayPage("Here is some dynamic content loaded on button click.");
        // const addContent = MmainContent("test");
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.innerHTML = content;
         // mainContent.innerHTML += <MmainContent content={content} />;
        }
      }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
        Display content
      </button>
    <MmainContent content={" - This is content from MmainContent component."} />
      <div id="main-content" className="p-4 m-4 bg-white rounded shadow">
        {/* Dynamic content will be displayed here */}
    </div>
      <footer className="App-footer">
        <p>© 2024 My First React App</p>
      </footer>
    </div>
  );
}

function displayPage(page) {
  console.log(internalFunction.testVariable);
  console.log(JSON.stringify(page))
  console.log("Displaying the page content.");
  return `<p>${page}</p>`;
}

const greeting = "Hello, welcome to my React app!";
function greetUser(name) {
  return `${greeting} Nice to meet you, ${name}.`;
}

console.log(greetUser("User"));

export default App;
