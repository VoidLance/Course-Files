document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.querySelectorAll('.flash').forEach((element) => {
            element.style.opacity = '0';
        });
    }, 3000);
});
