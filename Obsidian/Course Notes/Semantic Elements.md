Semantic elements are html elements that give other elements meaning. They include `<nav>`, `<section>` and `<header>`. The difference between section and div is that the div can be used anywhere on the page, meaning it doesn't necessarily define as a section. Semantic elements are themed differently from other elements.
- IDs and classes are user-created, so web browsers and other programs don't know what they really mean
- Whereas semantic elements are defined by html in a way programs can understand
- `<header>` is one type of semantic element, as is `<footer>`
(it's a good idea to preserve the nav and footer elements across pages)
- `<section>` is to group content into separate themes. It is used for chapters, introductions, news items, etc
- Another semantic element is `<article>`
	- It can be used for news or anything you might consider an article.
	- It is usually used for things that are not a full part of the website, and get treated as separate from the page
- `<header>` is used for introductory content and usually needs to grab attention
	- Most of the time there will be one header on a page
	- You cannot place a header inside a footer, or an address, or any similar element, as it wouldn't make sense for the webpage
	- It is possible, though very rare, to have more than one footer
- `<aside>` is content that is indirectly or tangentially related to the surrounding content, and is usually positioned to the side of that content
- `<figure> <figcaption>` is used to define a demonstrative or diagrammatical figure, and to caption it
	- Where caption is a property for a standard `<img>` tag, `<figcaption>` is a separate element that is included inside `<figure></figure>` element [[tags]].
	- `<img>` [[tags]] are also still required inside `<figure>` [[tags]] in order to add the relevant image


[[Display and layout of HTML elements]] is extremely important

#software-development 