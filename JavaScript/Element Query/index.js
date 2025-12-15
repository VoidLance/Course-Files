document.querySelector("nav").innerHTML = `
    <ul>
        <li><a href="/JavaScript/Array Methods/">Array Methods</a></li>
        <li><a href="/JavaScript/Async Await/">Async Await</a></li>
        <li><a href="/JavaScript/Banking/">Banking</a></li>
        <li><a href="/JavaScript/Element Query/">Element Query</a></li>
        <li><a href="/JavaScript/Form Validation/">Form Validation</a></li>
        <li><a href="/JavaScript/Local Storage/">Local Storage</a></li>
        <li><a href="/JavaScript/Promises/">Promises</a></li>
        <li><a href="/JavaScript/Regular Expressions/">Regular Expressions</a></li>
        <li><a href="/JavaScript/Sorting Algorithms/">Sorting Algorithms</a></li>
        <li><a href="/JavaScript/Web APIs/">Web APIs</a></li>
    </ul>
`;
// Remove all export statements so functions are available globally
function queryElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        return element;
    } else {
        console.warn(`Element with selector "${selector}" not found.`);
        return null;
    }
}

function queryAllElements(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        return elements;
    } else {
        console.warn(`No elements found with selector "${selector}".`);
        return [];
    }
}

function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);
    Object.keys(options).forEach(key => {
        if (key === 'classList' && Array.isArray(options[key])) {
            options[key].forEach(className => element.classList.add(className));
        } else if (key === 'styles' && typeof options[key] === 'object') {
            Object.assign(element.style, options[key]);
        } else if (key === 'attributes' && typeof options[key] === 'object') {
            Object.entries(options[key]).forEach(([attr, value]) => element.setAttribute(attr, value));
        } else {
            element[key] = options[key];
        }
    });
    return element;
}

function appendElement(parent, child) {
    const parentElement = typeof parent === 'string' ? queryElement(parent) : parent;
    const childElement = typeof child === 'string' ? createElement(child) : child;
    if (parentElement && childElement) {
        parentElement.appendChild(childElement);
    }
}

function removeElement(selector) {
    const element = queryElement(selector);
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function setElementContent(selector, content) {
    const element = queryElement(selector);
    if (element) {
        element.innerHTML = content;
    }
}

function setElementText(selector, text) {
    const element = queryElement(selector);
    if (element) {
        element.textContent = text;
    }
}

function setElementAttribute(selector, attribute, value) {
    const element = queryElement(selector);
    if (element) {
        element.setAttribute(attribute, value);
    }
}

function addElementClass(selector, className) {
    const element = queryElement(selector);
    if (element) {
        element.classList.add(className);
    }
}
function removeElementClass(selector, className) {
    const element = queryElement(selector);
    if (element) {
        element.classList.remove(className);
    }
}

function toggleElementClass(selector, className) {
    const element = queryElement(selector);
    if (element) {
        element.classList.toggle(className);
    }
}

function clearElementContent(selector) {
    const element = queryElement(selector);
    if (element) {
        element.innerHTML = '';
    }
}

function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

function getElementAttribute(selector, attribute) {
    const element = queryElement(selector);
    if (element) {
        return element.getAttribute(attribute);
    }
    return null;
}

function getElementText(selector) {
    const element = queryElement(selector);
    if (element) {
        return element.textContent;
    }
    return null;
}

function getElementHTML(selector) {
    const element = queryElement(selector);
    if (element) {
        return element.innerHTML;
    }
    return null;
}

function setElementStyles(selector, styles) {
    const element = queryElement(selector);
    if (element && typeof styles === 'object') {
        Object.assign(element.style, styles);
    }
}

function getElementStyles(selector) {
    const element = queryElement(selector);
    if (element) {
        return window.getComputedStyle(element);
    }
    return null;
}

function cloneElement(selector, deep = true) {
    const element = queryElement(selector);
    if (element) {
        return element.cloneNode(deep);
    }
    return null;
}

function replaceElement(oldSelector, newElement) {
    const oldElement = queryElement(oldSelector);
    if (oldElement && newElement) {
        oldElement.parentNode.replaceChild(newElement, oldElement);
    }
}

function wrapElement(selector, wrapperTag, wrapperOptions = {}) {
    const element = queryElement(selector);
    if (element) {
        const wrapper = createElement(wrapperTag, wrapperOptions);
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    }
}

function unwrapElement(selector) {
    const element = queryElement(selector);
    if (element && element.parentNode) {
        const parent = element.parentNode;
        parent.parentNode.insertBefore(element, parent);
        parent.parentNode.removeChild(parent);
    }
}

function scrollToElement(selector, options = { behavior: 'smooth', block: 'start' }) {
    const element = queryElement(selector);
    if (element) {
        element.scrollIntoView(options);
    }
}

function focusElement(selector) {
    const element = queryElement(selector);
    if (element) {
        element.focus();
    }
}

function blurElement(selector) {
    const element = queryElement(selector);
    if (element) {
        element.blur();
    }
}

function isElementVisible(selector) {
    const element = queryElement(selector);
    if (element) {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }
    return false;
}

function getElementPosition(selector) {
    const element = queryElement(selector);
    if (element) {
        return element.getBoundingClientRect();
    }
    return null;
}

function getElementDimensions(selector) {
    const element = queryElement(selector);
    if (element) {
        return {
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
    return null;
}

function setElementDimensions(selector, width, height) {
    const element = queryElement(selector);
    if (element) {
        if (width !== null) element.style.width = typeof width === 'number' ? `${width}px` : width;
        if (height !== null) element.style.height = typeof height === 'number' ? `${height}px` : height;
    }
}

    // Attach all demo functions to window for browser access
    window.queryElement = queryElement;
    window.addElementClass = addElementClass;
    window.removeElementClass = removeElementClass;
    window.setElementText = setElementText;
    window.toggleElementVisibility = toggleElementVisibility;

    // Demo Button Interactivity
    window.addEventListener('DOMContentLoaded', function() {
        const output = document.getElementById('output');
        const selectorInput = document.getElementById('selector');
        if (!output || !selectorInput) return;

        const queryBtn = document.getElementById('queryBtn');
        const toggleBtn = document.getElementById('toggleBtn');
        const addClassBtn = document.getElementById('addClassBtn');
        const removeClassBtn = document.getElementById('removeClassBtn');
        const setTextBtn = document.getElementById('setTextBtn');

        if (queryBtn) {
            queryBtn.onclick = function() {
                const selector = selectorInput.value;
                const el = window.queryElement(selector);
                if (el) {
                    output.textContent = `Found element: <${el.tagName.toLowerCase()}>`;
                    output.style.color = '#3576d6';
                } else {
                    output.textContent = 'No element found.';
                    output.style.color = 'crimson';
                }
            };
        }
        if (toggleBtn) {
            toggleBtn.onclick = function() {
                const selector = selectorInput.value;
                window.toggleElementVisibility(selector);
            };
        }
        if (addClassBtn) {
            addClassBtn.onclick = function() {
                const selector = selectorInput.value;
                window.addElementClass(selector, 'demo-highlight');
            };
        }
        if (removeClassBtn) {
            removeClassBtn.onclick = function() {
                const selector = selectorInput.value;
                window.removeElementClass(selector, 'demo-highlight');
            };
        }
        if (setTextBtn) {
            setTextBtn.onclick = function() {
                const selector = selectorInput.value;
                window.setElementText(selector, 'Text set by demo!');
            };
        }
    });

    function toggleElementVisibility(selector) {
        const element = queryElement(selector);
        if (element) {
            const style = window.getComputedStyle(element);
            if (style.display === 'none') {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        }
    }

// Remove export so the demo button handler uses the correct function
function toggleElementVisibility(selector) {
    const element = queryElement(selector);
    if (element) {
        if (getElementStyles(selector).display === 'none') {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    }
}

function clearElementStyles(selector) {
    const element = queryElement(selector);
    if (element) {
        element.removeAttribute('style');
    }
}