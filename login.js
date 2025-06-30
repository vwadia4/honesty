function validateLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    // basic non-empty validation
    if (!user || !pass) {
        alert('Please enter both username and password.');
        return false;
    }

    // Optional: check against a single valid account
    const validUser = 'admin';
    const validPass = 'secret123';
    if (user === validUser && pass === validPass) {
        alert('Login successful!');
        // allow form submission or redirect manually
        return true;
    }

    alert('Incorrect username or password.');
    return false;
}

