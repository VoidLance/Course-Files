// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React App</h1>
        <p>Welcome to my first React application!</p>
      </header>
    <p className="App-intro border-r-green-200 border-4 p-4 m-4 rounded-lg bg-blue-100 text-blue-800 border-b-green-200 border-t-slate-400 border-l-slate-400">
        This is a simple React app to demonstrate the structure of a React component.
      </p>
    <div id="main-content" className="p-4 m-4 bg-white rounded shadow">
    </div>
      <footer className="App-footer">
        <p>© 2024 My First React App</p>
      </footer>
    </div>
  );
}

const greeting = "Hello, welcome to my React app!";
function greetUser(name) {
  return `${greeting} Nice to meet you, ${name}.`;
}

console.log(greetUser("User"));
document.getElementById("main-content").innerText = greetUser("Visitor");

export default App;
