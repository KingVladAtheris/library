const defaultBooks = [
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("1984", "George Orwell", 328, true),
    new Book("Moby-Dick", "Herman Melville", 585, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  ];
  
  const myLibrary = [...defaultBooks]; // Initialize with default books
  
  function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  function addBookToLibrary() {
    const title = document.getElementById("booktitle").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
  
    // Basic validation
    if (!title || !author || !pages) {
      alert("Please fill out all fields!");
      return;
    }
  
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
  
    // Clear input fields
    document.getElementById("booktitle").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
  
    displayBooks(); // Refresh the display
  }
  
  function toggleReadStatus(id) {
    // Find the book by ID and toggle the 'read' status
    const book = myLibrary.find(book => book.id === id);
    if (book) {
      book.read = !book.read; 
      displayBooks(); 
    }
  }
  
  function displayBooks() {
    const container = document.getElementById("library");
    container.innerHTML = ""; // Clear the current list
  
    myLibrary.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book");
      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p>${book.read ? "Read" : "Not read yet"}</p>
        <div> 
            <button onclick="removeBook('${book.id}')">Delete</button>
            <button onclick="toggleReadStatus('${book.id}')">
            ${book.read ? "Mark as Unread" : "Mark as Read"}
            </button>
        </div>    
      `;
      container.appendChild(bookCard);
    });
  }
  
  function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    
    if (index !== -1) {
      myLibrary.splice(index, 1);  // Removes the book from the array
    }
  
    displayBooks(); 
  }

// Search function
function searchBooks() {
  const searchQuery = document.getElementById("search-input").value.toLowerCase();

  const filteredBooks = myLibrary.filter(book => {
    return book.title.toLowerCase().includes(searchQuery) ||
           book.author.toLowerCase().includes(searchQuery);
  });

  // Display the filtered books
  displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(filteredBooks) {
  const container = document.getElementById("library");
  container.innerHTML = ""; 
  filteredBooks.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read yet"}</p>
      <div> 
            <button onclick="removeBook('${book.id}')">Delete</button>
            <button onclick="toggleReadStatus('${book.id}')">
            ${book.read ? "Mark as Unread" : "Mark as Read"}
            </button>
        </div>    
    `;
    container.appendChild(bookCard);
  });
}

// Initial display (if any books are already in the array)
displayBooks();

// Toggle Add Book section visibility
function toggleAddBook() {
    const addBookDiv = document.getElementById("addbook");
    const addButton = document.querySelector("button[onclick='toggleAddBook()']");
  
    addBookDiv.classList.toggle("hidden");
  
    if (addBookDiv.classList.contains("hidden")) {
      addButton.classList.remove("active");
    } else {
      addButton.classList.add("active");
    }
  }
  
  // Toggle Search section visibility
  function toggleSearch() {
    const searchDiv = document.getElementById("search");
    const searchButton = document.querySelector("button[onclick='toggleSearch()']");
  
    searchDiv.classList.toggle("hidden");
  
    if (searchDiv.classList.contains("hidden")) {
      searchButton.classList.remove("active");
    } else {
      searchButton.classList.add("active");
    }
  }
  
  // Clear search and show all books
    function clearSearch() {
    document.getElementById("search-input").value = "";  
    displayBooks();  
  }