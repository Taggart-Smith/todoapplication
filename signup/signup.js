function submitData() {
    let firstName = document.getElementById("firstname-input").value;
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;
    let repeatPassword = document.getElementById("repeat-password-input").value;
    console.log(firstName, email, password, repeatPassword);
}

function validateForm(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return regex.test(password);
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let password = document.getElementById('password-input').value;
    let repeatPassword = document.getElementById('repeat-password-input').value;

    let isPasswordValid = validateForm(password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
        alert('Password needs to be: 6-20 Characters Long, Have at Least 1 Special Character, 1 Uppercase, 1 Lowercase, and 1 Number');
        console.log(password);
    } else if (password !== repeatPassword) {
        alert('Password and Repeat Password are not the same')
    } else {
        console.log("This shit works");
        submitData();
    }
});