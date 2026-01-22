import react from "react";

export const testFunction = () => {
    console.log("This is a test function");
};

export const anotherTestFunction = (input) => {
    console.log("This is another test function");
    input += " processed";
  return input;
};
function yetAnotherTestFunction(input) {
    console.log("This is yet another test function");
    input += " modified";
}
export function internalFunction() {
  let testVariable = "Test variable content. ";
  testVariable += anotherTestFunction("firstdata");
  yetAnotherTestFunction("coolfunc");
  console.log(testVariable);
  return "Internal function executed";

};


function MmainContent({content}) {
    return (<div className="border-4 border-l-red-300 border-t-red-300 text-slate-400 bg-lime-200 rounded-xl"><p className="underline font-bold">Main Content Component{content}</p></div>);
}

export default MmainContent;

internalFunction.testVariable = "This is a test variable inside internalFunction.";

export const arrowFunctionTest = (param) => {
    return `Arrow function received: ${param}`;
};

export const multiply = (a, b) => a * b;

export const divide = function(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
};

export const constantValue = 42;

export const piValue = 3.14159;

export const greet = (name) => `Hello, ${name}!`;

export const farewell = function(name) {
    return `Goodbye, ${name}!`;
};
