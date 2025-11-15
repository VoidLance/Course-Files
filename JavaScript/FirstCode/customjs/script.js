window.onload = function() {
  alert("Hello, welcome to JavaScript! Kinda basic so far, but I'm sure it gets more complex.");
}

// Function to replace text in a paragraph with id "demo"
function replace() {
  var paragraph = document.getElementById("demo");
  paragraph.textContent = "New Text!";
}