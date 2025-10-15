---
banner: "![[pixel-banner-images/banner-for-software-development-notes-above-a-s.jpg]]"
banner-height: 590
pixel-banner-flag-color: purple
---
- Websites should comprise of a hierarchy of folders and files, named appropriately
- (note to find the best code editor for Chromebook)
- Doctype html sets which version of html to use.
- we want to use the latest (html5) declaration which is `<!DOCTYPE html>`
- `<html>` [[tags]] define the root element of the document. 
- Everything inside `<html>` [[tags]] is "nesting", or nested within the [[tags]].
- When you create `<html>` [[tags]], you are informing the page that this is the root html element.
- There should be nothing after the `</html>` element, and the only thing that should be before the `<html>` tag is the` <!DOCTYPE html>` tag.
- An html document does not see spaces.
- `<head></head> and <body></body>` are two crucial elements for all html documents.
- `<head>`contains metadata that does not appear on pages.
- `<body>` contains everything that gets rendered on the page.
- `<head>`
	- `<title>title of the page</title>`
- `</head>`
- `<body>`
	- text goes in as text, other elements go in as [[tags]]
- `</body>`

- Placeholder text should be used to show what a page design looks like with text in it, particularly for showing to clients.

- As a web developer, it is common to be given a PS document or other image showing what the client wants the page to look like. It is then the web designer's job to use html and CSS to make the page look as similar to the mockup as possible.
- larger file sizes will take longer to load in. Therefore, it is essential to process images and optimise them.
- `<img>` does not have a closing tag
- `<img>` has an href attribute that appears to the user that they have gone to a different web page
- alt attributes are used to give images alt text
- You can add a closing / to an `<img>` tag after adding attributes. For example:
`<img
src="source.jpg"
style="Height:500px;"
/>`
- CSS works with Property:Value;
- Float property is for images, and has a left and right value. It is used to change where the image appears on the page.

- Hyperlinks allow users to send emails
- `<a>` is for Anchor
- href is for Hypertext Reference
- to turn an image into a link, wrap the `<img>` tag inside `<a></a>` [[tags]]
- email attribute: "mailto:example@email.com"
- Add a horizontal line: `<hr>`
- CSS can format the layout of webpages and the spacing between html elements.
- CSS can control the colour of webpages and the individual html elements
- CSS can control the type and size of text or fonts in webpages
- CSS can add background colours and images to html elements.
- CSS can be used to change the look of a webpage across different devices and screens.
- Front end devs may be expected to know how to use CSS to change how a webpage looks across at least mobile and desktop screens.
- CSS can be used in inline, internal and external ways.
- Inline is used directly in the html element within the body of an html element, using the style attribute
- Internal CSS is used in the `<style>` element in the `<head>` section of an html element.
- External CSS is used in an external CSS file and linked to the html document using the `<link>` element
- Best practice is to use external CSS, second best is internal, and inline CSS should only be used when very minimal CSS is required, and only for one element.
- ID: `<p id="new id">`
- CSS: `#new id`
- ID can be used for other things such as within JavaScript.
- `<link rel="stylesheet" href="style.css">`
- `<script>` is the tag used to begin JavaScript within an html document

[[Display and layout of HTML elements]] is extremely important

This also links to [[Module 3 - HTML and CSS]]

#software-development 