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

const aboutMeGroup = aboutMe.parentElement;

// Hide About Me Section Phele 
aboutMeGroup.style.display = "none";

// Toggle About Me Visibility and Validation 
enableAbout.onchange = function () {
    if (this.checked) {
        aboutMeGroup.style.display = "block"; // agar checked toh Visible
        aboutMe.disabled = false; // Then it enable user to write
        aboutMe.focus();
    } else {
        aboutMeGroup.style.display = "none"; // Hide About Section if uncheck
        aboutMe.disabled = true;
        aboutMe.value = "";
        charCount.textContent = "0";
        document.getElementById("aboutMeError").textContent = "";
    }
};

aboutMe.oninput = function () {
    charCount.textContent = this.value.length;
};

// Validation Patterns 
const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

// Individual Validation Functions for Immediate Error Feedback
    
// First Name Validation 
function validateFirstName() {
    const firstNameValue = firstName.value.trim();
    if (firstNameValue === "") {
        showError("firstNameError", "First Name is required");
        return  false;
    } else if(!nameRegex.test(firstNameValue)) {
        showError("firstNameError", "Only alphabets are allowed.");
        return  false;
    } else if (firstNameValue[0] !== firstNameValue[0].toUpperCase()) {
        showError("firstNameError", "First Letter must be Uppercase!");
        return  false;
    }
    clearError("firstNameError");
    return true;
}

// Middle Name Validation 
function validateMiddleName() {
    const middleNameValue = middleName.value.trim();
    if (middleNameValue === "") {
        showError("middleNameError", "Middle Name is required");
        return false;
    } else if(!nameRegex.test(middleNameValue)) {
        showError("middleNameError", "Only alphabets are allowed.");
        return false;
    } else if (middleNameValue[0] !== middleNameValue[0].toUpperCase()) {
        showError("middleNameError", "Middle Letter must be Uppercase!");
        return false;
    }
    clearError("middleNameError");
    return true;
}

// Last Name Validation 
function validateLastName() {
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === "") {
        showError("lastNameError", "Last Name is required");
        return false;
    } else if(!nameRegex.test(lastNameValue)) {
        showError("lastNameError", "Only alphabets are allowed.");
        return false;
    } else if (lastNameValue[0] !== lastNameValue[0].toUpperCase()) {
        showError("lastNameError", "Last Letter must be Uppercase!");
        return false;
    }
    clearError("lastNameError");
    return true;
}
    
// Gender Validation
function validateGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if(!selectedGender) {
        showError("genderError", "Please select your Gender.");
        return false;
    }
    clearError("genderError");
    return true;
}

// Email Validation 
function validateEmail() {
    const emailValue = email.value.trim();
    if (emailValue === "") {
        showError("emailError", "Email ID is required.");
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError("emailError", "Please enter a valid email ID");
        return false;
    }
    clearError("emailError");
    return true;
}

//  Mobile Validation 
function validateMobile() {
    const mobileValue = mobile.value.trim();
    if (mobileValue === "") {
        showError("mobileError", "Mobile Number is required.");
        return false; 
    } else if (!mobileRegex.test(mobileValue)) {
        showError("mobileError", "Enter a valid 10-digit Mobile Number.");
        return false;
    }
    clearError("mobileError");
    return true;
}

// Birth Date Validation
function validateBirthDate() {
    const birthDateValue = birthDate.value.trim();
    if (birthDateValue === "") {
        showError("birthDateError", "Birth Date is required.");
        return false;
    } else {
        const selectedDate = new Date(birthDateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
            showError("birthDateError", "Future dates are not allowed.");
            return false;
        }
    }
    clearError("birthDateError");
    return true;
}

// About ME 
function validateAboutMe() {
    if (enableAbout.checked) {
        const aboutValue = aboutMe.value.trim();
        if (aboutValue === "") {
            showError("aboutMeError", "Please enter About Me.");
            return false;
        } else if (aboutValue.length > 1024) {
            showError("aboutMeError", "Maximum 1024 characters allowed.");
            return false;
        }
    }
    clearError("aboutMeError");
    return true;
}

// Bind karenge for Immediate Validation on Input/Change Events par
firstName.addEventListener("input", validateFirstName);
middleName.addEventListener("input", validateMiddleName);
lastName.addEventListener("input", validateLastName);
email.addEventListener("input", validateEmail);
mobile.addEventListener("input", validateMobile);
birthDate.addEventListener("input", validateBirthDate);

// Gender radio list Binding
gender.forEach(function(radio) {
    radio.addEventListener("change", validateGender);
});

// About Me Character Count and validation on input 
aboutMe.addEventListener("input", function() {
    charCount.textContent = this.value.length;
    validateAboutMe();
});

// Validation Function on Submitting the form 
function validateForm(event) {
    if(event) {
        event.preventDefault(); // Prevents default form submit and keeps data out of URL
    }

    let isFirstNameValid = validateFirstName();
    let isMiddleNameValid = validateMiddleName();
    let isLastNameValid = validateLastName();
    let isGenderValid = validateGender();
    let isEmailValid = validateEmail();
    let isMobileValid = validateMobile();
    let isBirthDateValid = validateBirthDate();
    let isAboutMeValid = validateAboutMe();
    
    let valid = isFirstNameValid && isMiddleNameValid && isLastNameValid &&
                isGenderValid && 
                isEmailValid && isMobileValid &&
                isBirthDateValid &&
                isAboutMeValid;
                
    // Succss 
    if (valid) {
        alert("Student Registration Successful!");
        document.getElementById("studentForm").reset();
        aboutMeGroup.style.display = "none";
        charCount.textContent = "0";
        clearErrors();
    }

    // return valid;
}

// Show Error Message
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear Error for Specific Element
function clearError(id) {
    document.getElementById(id).textContent = "";
}

// Clear All Errors
function clearErrors() {
    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });
}

