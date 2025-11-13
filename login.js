document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', () => {
    console.log("Login button clicked"); // Debug log

    const username = document.getElementById('name').value.trim();
    const password = document.getElementById('pass').value.trim();

    // Admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '12345';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      alert('Login successful! Redirecting to admin panel...');

      window.location.href = 'admin.html';
    } 
    else {
      alert('Please check you username or password');
    }
  });
});
