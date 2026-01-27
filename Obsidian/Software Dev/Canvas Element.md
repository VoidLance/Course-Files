- used to create visual graphics on a webpage
- cannot be done only with html and css, it was designed to be used with javascript
- creates a drawing surface
- uses js to draw on the canvas

`<canvas id = "myCanvas" width = "200" height = "100"></canvas>`

`<script>`
	`const canvas=document.getElementById("myCanvas");
	`// get the html canvas element and set it to a constant variable
	
	const ctx = canvas.getContext("2d");
	// get the 2d rendering context
	ctx.fillStyle = "green"
	// set the fill style property of the drawing context
	
	ctx.fillRect (10,10,150,80);
	// draw and fill a rectangle`
`</script>
`</body>`

`<style>`
	`canvas {`
	`border: 1px solid black;`
	`}`

- getElementById is a method, meaning an action that the web browser needs to do.
- The parent of the method in these examples is the html documents, using document.getElementById
- fillRect (10, 10, 150, 80)
         ^  ^      ^     ^
         |   |       |      |
        top  left width height

`<script>`
	`const canvas = document.getElementById("myCanvas");
	`const ctx = canvas.getContext("2d");
	`ctx.fillStyle = "#4af7af";
	`ctx.beginPath(); //start a new path
	`ctx arc(85,50,40,0,Math.Pi*2); // draw a circle at (85,50) with radius 40
	`ctx.fill(); // fill the circle with the current fill colour
`</script>`

`ctx.arc (85,50,40,  0,              Math.Pi*   2)`
           ^    ^    ^       ^                                   ^            ^
           |     |     |        |                                   |             |
        top left radius starting angle    ending angle   Doubling pi completes the circle
                        |                           |               
            (0 is at the 3 o'clock position) (using pi to find the opposite side angle)
*optional - counterclockwise = true (false by default)*
my handwritten notes are better than Obsidian here

`so (85, 50, 40, 0, Math.Pi) will create an upside down semicircle
`while (85, 50, 40, 0, Math.PI, true) will create a semicircle
`and (85, 50, 40, 0, Math.PI*2) will create a circle

- Because the canvas uses javascript, the canvas draws these shapes in real time instead of together with the html before the page is loaded.

