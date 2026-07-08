document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.querySelectorAll('.flash').forEach((element) => {
            element.style.opacity = '0';
        });
    }, 3000);

    document.querySelectorAll('form[novalidate]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        });
    });

    document.querySelectorAll('.cart-inline-form').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(new FormData(form)).toString(),
            }).then(() => {
                window.location.reload();
            }).catch(() => {
                form.submit();
            });
        });
    });

    document.querySelectorAll('form[action$="cart/remove.php"]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(new FormData(form)).toString(),
            }).then(() => {
                window.location.reload();
            }).catch(() => {
                form.submit();
            });
        });
    });
});
