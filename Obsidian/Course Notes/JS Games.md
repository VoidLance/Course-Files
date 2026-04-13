<script>
	const canvas=document.getElementById("MyCanvas");
	const ctx=canvas.getContext("2d");
	// create linear gradient
	const gradient = ctx.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);
	gradient.addColorStep(0, "blue"); //add color step at the beginning (0%)
	gradient.addColorStep(1, "red"); //add color step at the end (100%)

	// Fill rectangle with gradient
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,canvas.width,canvas.height);
</script>

; executes the line of code
The above script just draws a rectangle with a gradient

<style>
	canvas {
		border: 2px solid red;
		width: 400px;
		height 200px;
		}
</style>

<script>
	const canvas = document.getElementById("MyCanvas");
	const ctx = canvas.getContext("2d");

	canvas.addEventListener("click", function(event) {
		const x = event.clientX - canvas.offsetLeft;
		const y = canvas.clientY - canvas.offsetTop;
		// draw a circle where the user clicked
		ctx.beginPath();
		ctx.arc(x,y,10,0,2*Math.PI);
		ctx.fill();
	});
</script>

The above script allows the user to click and generate circles

<script>
	const canvas = document.getElementById("MyCanvas");
	const ctx = canvas.getContext("2d");
	let isDrawing = false;

	canvas.addEventListener("mousedown", function(event){
		isDrawing=true;
		draw(
			event.clientX - canvas.offsetLeft,
			event.clientY - canvas.offsetTop
		);
	});
	
	canvas.addEventListener("mousemove", function(event) {
		if (isDrawing) {
			draw(
			event.clientX - canvas.offsetLeft,
			event.clientY - canvas.offsetTop
			);
		}
	});

	canvas.addEventListener("mouseup", function() {
		isDrawing = false;
	});

	function draw(x,y) {
		ctx.fillstyle = "black";
		ctx.fillRect(x,y,55);
	}
</script>

The above script creates a canvas for the user to draw in

<script>
	const canvas = document.getElementById("MyCanvas");
	const ctx = canvas.getContext("2d");

	// Create a new image object
	const img = newImage();

	// Set the source of the image
	img.src = "spongebob.png";

	img.onload = function() {
		ctx.drawimage(img,0,0,canvas.width,canvas.height);
	};

	// Add click event listener to spin the image
	canvas.addEventListener("click", function() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		const angle = 0;
		rotateImage(img,angle);
	});

	// Function to rotate the image
	function rotateImage(image,angle) {
		ctx.save();
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.rotate(angle*Math.PI)/180);
		ctx.drawImage(
			image,
			canvas.width/2,
			canvas.height/2,
			canvas.width,
			canvas.height
		);
		canvas.restore();
		
		//increment angle for next rotation
		const newAngle = angle +10;
		if (newAngle<360) {
			setTimeout (function () {
				rotateImage(image,newAngle);
			}, 100);
		}
	}
</script>

The above script allows the user to spin an image by clicking