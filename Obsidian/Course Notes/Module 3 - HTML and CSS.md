---
banner: "![[pixel-banner-images/banner-for-software-development-notes-above-a-s.jpg]]"
pixel-banner-flag-color: purple
banner-height: 580
---
- `<div>` = division - used as a container for the html elements.
- It separates sections on an html page.
- Any type of html content can be placed inside.
- It allows sections to be given their own CSS
- Creates a division between elements/sections
- Content within div tags should be tabbed to indicate that it is contained
- Can use the border CSS property on a whole div section. This requires width and outset properties, and can accept padding and colour properties.
- ^ Padding is not a border property, it is applied to the element to create space around the element.
- (It seems like `<nav>` and `<section>` are similar)
- Internal CSS is just external CSS, contained within `<style>` tags.
- CSS can be applied to all `<div>` elements to give a consistent feel, and id or class can be used to make more unique styling
- (I am taking notes in a notebook and then transferring them to Obsidian, which both gives the information an extra chance to enter my brain and me a chance to improve my cursive handwriting)
- Class can be used either in internal or external CSS, not in inline CSS
- Class is called in CSS using .myclass and inserted into html using the class="myclass" property
- `<div> class="grey"> </div>`
- `.grey {`
	- `border: 50px outset color: grey;`
	- `padding:20px;`
	- `}
- We can have multiple divs nested within each other
- Nav and section elements are semantic elements which function the same as divs, but are more appropriately named for their usage
- (Apparently we're only just getting to list elements being used in navbar links)
- When using anchor tags, we should always use relative urls if possible
- `list-style-type: none` to remove bullet points
- (This is what I was waiting for)
- Reset margin and padding is commonly done for nav elements
- Remove underlines:
- `a: link {`
			`text-decoration: none;`
			`}`
Place list items in a row:
`li {`
	`display: inline;`
	}`
- `<nav>` doesn't require `<ul>` or `<li>` - unless you're using it for style choices that require it
- `position: fixed;` means element will be relative to the viewport, which means it will be fixed in place and appear in the same position even if the page is scrolled.
- Relative means the element is positioned relative to its parent element
- Absolute allows us to specify exactly where on the page the content will be displayed, down to the pixel.
- `width: 100%;` means that the content will be displayed all the way across the page on every device.
- Short code for padding: first value represents top/bottom, second value represents left/right
- `z-index:1000;` specifies how close to the top/front the element can appear. 1000 means it will appear above up to 1000 other items below it
- `box-shadow` adds a shadow to the box. It has inputs to change where it appears in relation to the box, and a colour.
- Reminder: We should be able to upload font files to the website folder and call the relative url when adding the font in CSS.
- `display:flex;` is another piece of responsive design that makes the content stretch so that they always appear in the right place
LOOK UP CSS RESETS!!
- `justify-content:middle;` (horizontal)
- `align-items:center;` (vertical)
- These both make the content appear in the middle of the box. Justify controls the alignment of items on the main axis, and accepts `flex-start`, `flex-end`, `center`, `space-between` and `space-around`. Align controls the alignment of items on the cross axis, and accepts `flex-start`, `flex-end`, `center`, `baseline` and `stretch`
- Justify default is `flex-start` while align default is `stretch`
- It will be useful to learn which fonts are available across all web browsers.
- 6 Fs is white hex code, 6 0s is black hex code
- Always have a similar compatible font in addition to the one you actually want to use.
Look up how to use Google fonts
- `transition` adds animation to elements
- `transition: color 0.3s, border-bottom 0.3s;` will animate colour and border bottom properties, and the transition will last 0.3 seconds.
- `hover` adds effects to mouseover of links
- I understand now, transition dictates how long the animation lasts, but you set what changes in hover.
`nav a: hover {`
			`color:#fff;`
			`border-bottom: 2px solid #000;`
			`}`
Will change the navlinks to white and add a black line underneath them when moused over.
If we change the transition values, it will change how long the transition between states takes, and we can, for example, set the colour to change quicker than the border, like so:
`transition: color 0.2s, border-bottom 0.6s;`