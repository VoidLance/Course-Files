class Book:
    def __init__(self, title, author, available=True):
        self.title = title
        self.author = author
        self.available = available
        if available:
            library.add_book(self)

    def __repr__(self):
        status = "available" if self.available else "not available"
        return f"\nBook: \n{self.title!r} by {self.author!r}, available={status!r})"

    def __str__(self):
        status = "available" if self.available else "not available"
        return f"{self.title} by {self.author} ({status})"

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def search_by_title(self, title):
        # Use lambda to search for books by title
        search_title = lambda book: book.title.lower() == title.lower()
        return list(filter(search_title, self.books))

    def search_by_author(self, author):
        # Use lambda to search for books by author
        search_author = lambda book: book.author.lower() == author.lower()
        return list(filter(search_author, self.books))

    def update_availability(self, title, available):
        # Use lambda to update book availability
        update_book = lambda book: setattr(book, 'available', available) if book.title.lower() == title.lower() else None
        list(map(update_book, self.books))

library = Library()

lord_Of_The_Rings = Book("Lord of the Rings", "JRR Tolkien")
catcher_in_the_Rye = Book("Catcher in the Rye", "JD Salinger")

print(library.books)

# Search for books by title
print("\nBooks with title 'Lord of the Rings':")
for book in library.search_by_title("Lord of the Rings"):
    print(f"- {book.title} by {book.author}")

# Search for books by author
print("\nBooks by author 'JD Salinger':")
for book in library.search_by_author("JD Salinger"):
    print(f"- {book.title} by {book.author}")

# Update book availability
library.update_availability("Catcher in the Rye", False)

# Check updated availability
print("\nAvailability of 'Catcher in the Rye':")
for book in library.search_by_title("Catcher in the Rye"):
    print(f"- {book.title} is {'available' if book.available else 'not available'}")
