// First Name
const firstName = document.getElementById("firstName");

// Middle Name 
const middleName = document.getElementById("middleName");

// Last Name 
const lastName = document.getElementById("lastName");

// Gender 
const gender = document.getElementsByName("gender");

// Email 
const email = document.getElementById("email");

// Mobile 
const mobile = document.getElementById("mobile");

// Birth Date 
const birthDate = document.getElementById("birthDate");
birthDate.max = new Date().toISOString().split("T")[0];

// Enable About Me
const enableAbout = document.getElementById("enableAbout");

// About Me
const aboutMe = document.getElementById("aboutMe");
const charCount = document.getElementById("charCount");

enableAbout.onchange = function () {
    if (this.checked) {
        aboutMe.disabled = false;
        aboutMe.focus();
    } else {
        aboutMe.disabled = true;
        aboutMe.value = "";
        charCount.textContent = "0";
        document.getElementById("aboutError").textContent = "";
    }
};

aboutMe.oninput = function () {
    charCount.textContent = this.value.length;
};

// Validation Patterns 
const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

// Validation Function 
function validateFunction() {
    clearErrors();

    let valid = true;

    const firstNameValue = firstName.value.trim();
    const middleNameValue = middleName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const mobileValue = mobile.value.trim();
    const birthDateValue = birthDate.value.trim();
    const aboutValue = aboutMe.value.trim();

    // First Name Validation 
    if (firstNameValue === "") {
        showError("firstNameError", "First Name is required");
        valid = false;
    } else if(!nameRegex.test(firstNameValue)) {
        showError("firstNameError", "Only alphabets are allowed.");
        valid = false;
    } else if (firstNameValue[0] !== firstNameValue[0].toUpperCase()) {
        showError("firstNameError", "First Letter must be Uppercase!");
        valid = false;
    }

    // Middle Name Validation 
    if (middleNameValue === "") {
        showError("middleNameError", "Middle Name is required");
        valid = false;
    } else if(!nameRegex.test(middleNameValue)) {
        showError("middleNameError", "Only alphabets are allowed.");
        valid = false;
    } else if (middleNameValue[0] !== middleNameValue[0].toUpperCase()) {
        showError("middleNameError", "First Letter must be Uppercase!");
        valid = false;
    }

    // Last Name Validation 
    if (lastNameValue === "") {
        showError("lastNameError", "Last Name is required");
        valid = false;
    } else if(!nameRegex.test(lastNameValue)) {
        showError("lastNameError", "Only alphabets are allowed.");
        valid = false;
    } else if (lastNameValue[0] !== lastNameValue[0].toUpperCase()) {
        showError("lastNameError", "First Letter must be Uppercase!");
        valid = false;
    }

    // Gender Validation
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if(!selectedGender) {
        showError("genderError", "Please select your Gender.");
        valid = false;
    }

    // Email Validation 
    if (emailValue === "") {
        showError("emailError", "Email ID is required.");
        valid = false;
    } else if (!emailRegex.test(emailValue)) {
        showError("emailError", "Please enter a valid Email ID");
        valid = false;
    }


    //  Mobile Validation 
    if (mobileValue === "") {
        showError("mobileError", "Mobile Number is required.");
        valid = false; 
    } else if (!mobileRegex.test(mobileValue)) {
        showError("mobileError", "Enter a valid 10-digit Mobile Number.");
        valid = false;
    }

    // Birth Date Validation
    if (birthDateValue === "") {
        showError("birthDateError", "Birth Date is required.");
        valid = false;
    } else {
        const selectedDate = new Date(birthDateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
            showError("birthDateError", "Future dates are not allowed.");
            valid = false;
        }
    }

    // About ME 
    if (enableAbout.checked) {
        if (aboutValue === "") {
            showError("aboutMeError", "Please enter About Me.");
            valid = false;
        } else if (aboutValue.length > 1024) {
            showError("aboutMeError", "Maximum 1024 characters allowed.");
            valid = false;
        }
    }

    // Succss 
    if (valid) {
        alert("Student Registration Successful!");
    }

    return valid;
}

// Show Error Message
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear Errors
function clearErrors() {
    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });
}

