document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const interested = document.getElementById('interested').value;

        // Client-side validation (optional)
        if (password !== confirmPassword) {
            document.getElementById('error_message').textContent = 'Passwords do not match';
            return;
        }

        // Prepare data to send to the server
        const formData = {
            name: name,
            email: email,
            password: password,
        };

        // Send registration data to the backend
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Registration successful
                window.location.href = '/login.html'; // Redirect to login page
            } else {
                // Registration failed
                document.getElementById('error_message').textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('error_message').textContent = 'Error registering user. Please try again later.';
        });
    });
});
