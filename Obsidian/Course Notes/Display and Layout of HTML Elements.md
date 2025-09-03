- Not all websites are single-column, some need more complex layouts
- Sometimes sections need to be nested inside each other
- Sometimes we will need different layouts for different devices

Display properties of html elements are important to understand for this. We have block-level elements and inline-level elements as our two main types of html display properties. Everything by default is either defined as block-level or as inline-level elements.

`<div>`
	`<div>`
		`<h1>Heading</h1><h2>Separated</h2>`
	`</div>`
	`<div>`
		`<button>Click Here</button>`
	`</div>`
`</div>`

`div {`
	`border: 20px;`
	`}`
This will show what nested divs look like, with two divs stacked inside another.

## A div is a block-level element!!!
This means that it will stack.

Inline means that it will appear alongside instead.

- Block-level elements stretch out to the edge of the parent element and drop on a new line
- Inline stretches to the edge of the content.
- `<a>` elements are inline by default
- This is mostly fairly intuitive
- We can change the display behaviour of elements using CSS
- Adding borders can help you see which display property an element has
- `<p>` is block-level by default, so that they stack properly as you'd expect a paragraph to do
- We should be able to easily tell which elements are block-level or inline-level by default
- Block-level elements can contain inline-level elements but inline-level elements cannot contain block-level elements, otherwise the page would break

- Often the `float` property is used to allow elements to appear inline to the left or right of other elements. Clear may also be helpful in these circumstances as it clears the space to the right of a floating or inline element
- When we define the layout of a page, we also need to think about the size.
- CSS gives priority to selectors that are higher up in the ancestry. For example, a link that inherits from a list item that inherits from a list that inherits from a nav, the link will override any properties changed by any of the others
- Likewise, a div with an ID will override any properties changed by the global div


- After a long tangent, we're back to talking about size:
	- We can define a specific size or % size, although a block-level element will still line break
	- A reason we would want to use % size over specific size is to display the same on different screens - particularly when changing width
- Most elements are positioned statically. Static positioning means that properties such as top, left, etc will do nothing, as it will just display in the same place it would normally.
- Relative goes according to the normal flow of the page, as does Static, but Relative allows us to use position properties like top or left, which changes the position relative to the page.
- Absolute position takes the element completely out of the flow of the page and positions it relative to its most non-static ancestor (Honestly no clue what this actually means, so I'm just writing exactly what he said)
	- Absolute positioning positions according to its block within the viewport
	- This can cause items to fall on top of each other
- Fixed positions are relative to the viewport - fixes the item to the viewport
- Sticky positioning needs a position value such as top or left
- The item will move with the page, until it reaches the top of the viewport, at which point it will remain fixed

You must think of these when designing a page, thinking of both HTML AND CSS

There have been a number of frameworks developed developed to make it easier to define the layout of a page. Each has its own advantages and disadvantages
- Bootstrap is CSS and a little JS, and is a layout system that allows us to easily control the layout of our pages. It ensures the layout is responsive too. It uses a grid system
- Flexbox is a popular system. It is a layout that ensures html items behave in a predictable way when viewed on different devices.
	- It uses CSS and an axis system that allows rows and columns to be displayed in a horizontal and vertical way
	- It's simpler to apply than Bootstrap
	- This is what the flex display property is

The display properties are very important to know. I should take extra care to make the notes accessible. I should try using some of the frameworks myself to get a good idea of how they are used.