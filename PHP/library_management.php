<?php
class Book {
    public $title;
    public $author;
    public $isbn;

    function __construct($title, $author, $isbn) {
        $this->title = $title;
        $this->author = $author;
        $this->isbn = $isbn;
    }
}

class Library {
    private $books = array();

    public function addBook($book) {
        $this->books[] = $book;
    }

    public function getBooks() {
        return $this->books;
    }
}

?>