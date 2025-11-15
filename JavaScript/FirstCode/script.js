function replace() {
  var paragraph = document.getElementById("demo");
  paragraph.textContent = "New Text!";
}

// Using age variables and functions from class, but also adding a function to change age to minor for demonstration using console

var myAge = 25;
function makeMinor() {
  myAge = 15;
}
function greet() {
if (myAge >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
}

// Next lesson is called conditional statements - I would guess that means if else statements?

window.onload = function() {
  console.log("Page is fully loaded");
  this.alert("Welcome to the page!");
  greet();
} 