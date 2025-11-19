// Declaring variables

var myVariable = "Hello, World!";
let anotherVariable = Math.floor(Math.random() * (50 - 40) + 40); // Using built in methods to generate a random number between 40 and 50
const pi = 3.14;
let groupValue = [1, 2, 3, 4, 5];

// Function to increment each value in an array
function increment(value, index, array) {
  array[index] = value + 1;
}

// Function to greet a user
function greet(name) {
  return `Hello, ${name}!`;
}
// Executing greet function
console.log(greet("Alice"));


// Anonymous function
window.onload = function() {
  alert(myVariable);
}
// Debug variable value
console.log(anotherVariable)

// If conditional
if (anotherVariable > 40) {
  console.log("The answer is greater than 40.");
}

// Else conditional
else {
  console.log("The answer is 40 or less.");
}

// Switch statement
switch (anotherVariable) {
  case 40:
    console.log("The answer is exactly 40.");
    break;
  case 41:
    console.log("The answer is 41.");
    break;
  default:
    console.log("The answer is something else.");
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// While loop
while (groupValue.length < 10) {
    groupValue.forEach(increment);
  groupValue.push(groupValue.length + 1);
}

// Debug final groupValue
console.log("Final group value:", groupValue);

// Using forEach to increment each value in the array and print the result
groupValue.forEach(increment);
    console.log(groupValue);