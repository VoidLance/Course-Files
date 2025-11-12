- Javascript unlocks more dynamic web programming
- It is commonly used for adding interactivity and dynamic behaviour
- it can manipulate html and css, dynamically change content, respond to user actions, and interact with web servers
- php can do the same
- JavaScript is perceived to be a client-side scripting language and is a high-level programming language.
- AJAX and Node.JS allow Javascript to be used asynchronously
- AJAX is Asynchronous JavaScript And XML
- These frameworks allow client-side Javascript to enact changes on the serverside
- we are not currently learning about Node or AJAX
- Javascript can massively extend a programmer's skillset and website capability
- We can add Javascript to html by using the `<script> tag, but also grab the code from a .js file by specifying the src property, like <script src="example.js"></script>`
- There are also other ways of including Javascript
`<script>
	`Function myFunction() {:
	`alert("Button Clicked!");
	`}
`</script>`
`</head>
`<section class="Chapter-section">`
	`<button onclick="myFunction()">Click Me
	`</button>
- The alert function creates a popup
- as expected, we can pass values into a function using the ()
- Camel Caps are common fro creating javascript functions
- I might want to play around a bit with Javascript
- `<script>` tags can be included anywhere, and in fact most programmers say it should be included right at the bottom so that it loads after all the html
- `document.getElementById("elementid").innerHTML` passes the html element to the Javascript and changes what is between the element tags.
- might be an idea to find that old js changed heading somewhere in the html practice and add a button to change it instead
`<script>`
	function changeTag() {
	// get the existing heading element (man I love js comments compared to html)
	var heading = document.getElementById("heading");
	// create a new paragraph element
	var newParagraph=document.createElement("p");
	// set the content of the paragraph
	newParagraph.textContent = "This is a new paragraph created dynamically";
	// replace the existing heading with the new paragraph
	heading.parentNode.replaceChild(newParagraph, heading);
	}
`</script>`
- var creates and defines a variable
`<script>`
	`function changeAttributes() {
	`// get the existing image element
	`var image = document.getElementById("myImage");
	
	// change the src attribute
	image.src = "images/gallery2.jpg";
	
	// change the alt attribute
	image.alt = "New Image";
	}
`</script>`

`<script>`
	`document.addEventListener("DomContentLoaded", function(){
	`var image = document.getElementById("myImage");
	`// change image source on "Enter"
	`document.addEventListener("keydown, function(event){
	`if (event.key ==="Enter"){
	`image.src = "images/gallery2.jpg";
	`}
	`});
	`});
`</script>`


- Event Listener = waiting for a specific behaviour
- javascript may be required as a senior web developer
- It can be used to create dashboards
- codepen.io is a good resource for code examples
- anime.js is also worth looking at in more detail
