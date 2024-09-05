
// const loginForm = document.querySelector('.login-form');
// const registrationForm = document.querySelector('.registration-form');
// const loginLink = document.querySelector('.login-form .message a');
// const registerLink = document.querySelector('.registration-form .message a');

// // Show the registration form and hide the login form when "Register now" is clicked
// loginLink.addEventListener('click', function(event) {
//     // event.preventDefault(); // Prevent the default link behavior
//     loginForm.style.display = 'none'; // Hide the login form
//     registrationForm.style.display = 'block'; // Show the registration form
// });

// // Show the login form and hide the registration form when "Sign in" is clicked
// registerLink.addEventListener('click', function(event) {
//     // event.preventDefault(); // Prevent the default link behavior
//     registrationForm.style.display = 'none'; // Hide the registration form
//     loginForm.style.display = 'block'; // Show the login form
// });

$(document).ready(function () {

    $('.message a').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow")
    })

});


const signUpButton = document.getElementById('signup-btn');
const loginButton = document.getElementById('login-btn');

signUpButton.addEventListener("click", function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    

    if ((username.value.length == 0 || (email.value).length == 0) || (password.value).length == 0) {
        alert("Fill all the inputs before submitting");
        return;
    }

    const localusers = JSON.parse(localStorage.getItem('users'));
    
    

    if (localusers) {
        const takenUsername = localusers.find(user => user?.username === username.value)
        const takenEmail = localusers.find(user => user?.email === email.value)
    
        if (takenUsername) {
            alert("Username is already taken");
            return;
        }
    
        if (takenEmail) {
            alert("Email is already registered");
            return;
        }
    }
    

    
    

    let userInfo = {
        username: username.value,
        email: email.value,
        password: password.value,
    }

    // Retrieve existing users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add the new user
    users.push(userInfo);

    // Save the updated list back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert("Account created successfully");

    // console.log(userInfo);
});

loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    const loginemail = document.getElementById('loginemail');
    const loginpassword = document.getElementById('loginpassword');

    if ((loginemail.value).length == 0 || (loginpassword.value).length == 0) {
        alert("Fill all the inputs before submitting");
        return;
    }

    // Retrieve existing users
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the login credentials match any user
    const user = users.find(user => user.email === loginemail.value && user.password === loginpassword.value);

    if (user) {
        console.log("Login successful");
        // console.log(user);
        
        // Redirect to a different HTML file
        window.location.href = "expensetracker.html"; // Replace "dashboard.html" with your target HTML file
    } else {
        alert("Invalid credentials");
    }
});

