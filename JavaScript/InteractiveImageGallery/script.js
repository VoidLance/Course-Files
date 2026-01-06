// Function to add a new image to the gallery

function addImage() {
    // Access the value of the URL input and store in a variable
    const imageUrl = document.getElementById('image-upload').value;
    
    // Conditional statement that checks if imageUrl has a value
    if (imageUrl) {
        // Access the gallery HTML element where images will be displayed
        const gallery = document.getElementById('images-display');
        
        // Create a new div for the gallery item
        const galleryItem = document.createElement('div');
        
        // Add CSS class to the gallery item element
        galleryItem.classList.add('gallery-item');
        
        // Create an image element
        const img = document.createElement('img');
        
        // Assign the URL from input to the src attribute of the image
        img.src = imageUrl;
        
        // Create a new remove button
        const removeButton = document.createElement('button');
        
        // Assign text "Remove" to the button's textContent
        removeButton.textContent = 'Remove';
        
        // Add CSS class to the remove button element
        removeButton.classList.add('remove-button');
        
        // Assign arrow function to onclick property to remove the gallery item
        removeButton.onclick = () => {
            gallery.removeChild(galleryItem);
            saveGallery();
        };
        
        // Append the image and remove button to the gallery item
        galleryItem.appendChild(img);
        galleryItem.appendChild(removeButton);
        
        // Append the gallery item to the gallery
        gallery.appendChild(galleryItem);
        
        // Clear the input field
        document.getElementById('image-upload').value = '';
    }
    // Save the updated gallery state
    saveGallery();
}

// Save the current state of the gallery to local storage
function saveGallery() {
    const images = document.querySelectorAll('#images-display img');
    const imageUrls = Array.from(images).map(img => img.src);
    localStorage.setItem('imageGallery', JSON.stringify(imageUrls));
}

// Load the gallery state from local storage
function loadGallery() {
    // Set session marker first
    const hadSessionMarker = sessionStorage.getItem('pageSession');
    sessionStorage.setItem('pageSession', 'active');
    
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navEntry && navEntry.type === 'reload';
    
    // Only clear if it's the FIRST reload in this session (no prior marker)
    // This catches the case where user opens devtools and does hard refresh
    if (isReload && !hadSessionMarker) {
        localStorage.removeItem('imageGallery');
        localStorage.removeItem('lastUnloadTime');
    }
    
    const imageUrls = JSON.parse(localStorage.getItem('imageGallery')) || [];
    const gallery = document.getElementById('images-display');
    
    imageUrls.forEach(url => {
        // Create a new div for the gallery item
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        // Create an image element
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'User uploaded image';
        
        // Create a new remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        
        // Assign arrow function to onclick property to remove the gallery item
        removeButton.onclick = () => {
            gallery.removeChild(galleryItem);
            saveGallery();
        };
        
        // Append the image and remove button to the gallery item
        galleryItem.appendChild(img);
        galleryItem.appendChild(removeButton);
        
        // Append the gallery item to the gallery
        gallery.appendChild(galleryItem);
    });
}

// Load gallery on page load
window.onload = loadGallery;

// Event listener for the add image button

document.getElementById('add-image-button').addEventListener('click', addImage);
document.getElementById('image-upload').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addImage();
    }
});

// Add keyboard shortcut: Ctrl+Shift+K to clear gallery (for testing)
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        event.preventDefault();
        localStorage.removeItem('imageGallery');
        sessionStorage.clear();
        document.getElementById('images-display').innerHTML = '';
        console.log('Gallery cleared via keyboard shortcut (Ctrl+Shift+K)');
    }
});