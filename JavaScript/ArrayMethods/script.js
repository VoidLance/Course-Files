let array = [];

// Adding elements to the end of the array
function addElement() {
    const elementInput = document.getElementById('elementInput').value;
    array.push(elementInput);
    displayArray();
}

// Removing the last element from the array
function removeLastElement() {
    const removed = array.pop();
    displayArray();
    return removed;
}

// Removing the first element from the array
function removeFirstElement() {
    const removed = array.shift();
    displayArray();
    return removed;
}

// Adding elements to the beginning of the array
function addElementToBeginning() {
    const elementInput = document.getElementById('elementInput').value;
    array.unshift(elementInput);
    displayArray();
}

// Removing a specific element by index
function removeElement() {
    const indexInput = parseInt(document.getElementById('indexInput').value, 10);
    if (Number.isInteger(indexInput) && indexInput >= 0 && indexInput < array.length) {
        array.splice(indexInput, 1);
        displayArray();
    } else {
        alert("Index out of bounds");
    }
}

// Sorting the array
function sortArray() {
    array.sort();
    displayArray();
}

// Reversing the array
function reverseArray() {
    array.reverse();
    displayArray();
}

// Clearing the array
function clearArray() {
    array = [];
    displayArray();
}

// Display the array in the #arrayElements container
function displayArray() {
    const displayArea = document.getElementById('arrayElements');
    if (!displayArea) {
        return;
    }

    if (array.length === 0) {
        displayArea.textContent = "Array is empty.";
        return;
    }

    displayArea.innerHTML = '';
    array.forEach((element, index) => {
        const p = document.createElement('p');
        p.textContent = `Element ${index + 1}: ${element}`;
        displayArea.appendChild(p);
    });
}

// Initialize display on load
displayArray();

// Wire up buttons once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const byId = (id) => document.getElementById(id);

    const bindings = [
        ['addBtn', addElement],
        ['addFirstBtn', addElementToBeginning],
        ['removeBtn', removeLastElement],
        ['removeFirstBtn', removeFirstElement],
        ['removeIndexBtn', removeElement],
        ['sortBtn', sortArray],
        ['reverseBtn', reverseArray],
        ['clearBtn', clearArray],
    ];

    bindings.forEach(([id, handler]) => {
        const el = byId(id);
        if (el) {
            el.addEventListener('click', handler);
        }
    });
});
