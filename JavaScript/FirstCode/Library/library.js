
const library = [
    "Lord of the Rings",
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "Moby Dick",
    "War and Peace",
];
// I was watching the lesson "Loops" where he used text = text + ... to add to the innerHTML and I thought there had to be a better way
// So I looked up ways to print out an array in a list and used map to create an array of list items and then join to convert it to a string
// I continued watching and he used a for loop to do the same thing, so this is just an alternative way to do it, although with fewer lines of code
// I actually originally tried forEach but couldn't get it to work right, so I switched to map which worked fine
// I also was using <ul> tags originally but decided to just use <br> to see how close I could get to his output

document.getElementById("library").innerHTML = library.map(book => `${book}<br>`).join("");


//  I think I can do basically the same thing but using a foreach similar to like he did in the lesson, but still using fewer lines of code than he did
// document.addEventListener("DOMContentLoaded", function() {
//let listItems = "";
  //library.forEach(book => { listItems += `${book}<br>`;
 //});
   //  document.getElementById("library").innerHTML = listItems;
 //});

// Ahh, it's actually two lines longer this way because of the event listener. I still think the forEach is cleaner than his for loop with concatenation though. I don't like the way he used the i variable by creating it and using it in the same line without using it anywhere else. Either way, I'm gonna try it his way next and see if it still needs the event listener.

// let listItems = "";
// for (let i = 0; i < library.length; i++) {
//   listItems += `${library[i]}<br>`;
// }
// document.getElementById("library").innerHTML = listItems;
// arrgh it does work! I'm honestly not sure why. I looked up when the DOM content is loaded and it seems like both versions of the code should have worked without the event listener, since the script is at the bottom of the body regardless.


// so it turns out that both my own preferred forEach version and his for loop version both work fine without the event listener, so I think it's just a matter of preference which one to use.

// oh, maybe the event listener was needed because I had the require react line at the top, to make the map version work? I'm not sure. In any case, I think I'll just stick with my forEach version without the event listener since it seems to work fine that way.

// no, I just tried removing the require react line and the map version still works fine. So I think it's safe to say that neither version needs the event listener in this case, even though that was the only thing I changed that made it work before. I'm gonna leave the map version as is since I like it better. I'm very curious why the event listener made a difference before but not now.


// I looked at some documentation for the map property, and apparently it creates a new array by calling a function on every element of the original array. In this case, the function is just formatting each book title as a string with a <br> tag at the end. Then the join method combines all those strings into one big string that can be set as the innerHTML of the div.

// This can be used for multiple arrays in the same document, calling the same function each time to format the items in the array as needed. For example, if I had an array of authors, I could do something like this:

// const authors = [
   // {firstname : "J.R.R", lastname: "Tolkien"},
   // {firstname : "George", lastname: "Orwell"},
  //  {firstname : "Harper", lastname: "Lee"},
   // {firstname : "F. Scott", lastname: "Fitzgerald"},
   // {firstname : "Herman", lastname: "Melville"},
   // {firstname : "Leo", lastname: "Tolstoy"},
// ];
  
  // authors.map(getFullName);
  
 // function getFullName(item) {
   // return [item.firstname,item.lastname].join(" ");
  //}

  // and then if I had an array of customers, I could do something similar:

// const customers = [
    // {firstname : "Alice", lastname: "Smith"},
    // {firstname : "Bob", lastname: "Johnson"},
    // {firstname : "Charlie", lastname: "Brown"},
    // ];
// customers.map(getFullName);

// and not have to rewrite the getFullName function again. Pretty cool!