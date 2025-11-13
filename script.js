// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم إرسال رسالتك! شكراً لتواصلك معنا.');
            form.reset();
        });
    }
});