// State Variables
let students = JSON.parse(localStorage.getItem("students")) || []; //local storage pe object create karega
let currentPage = 1; // Current page one se
const rowsPerPage = 5; // Per Page pe 5 dikhana hai hume
let sortColumn = "firstName"; 
let sortDirection = "asc";
let searchQuery = "";
let editIndex = null;
let isFormDirty = false;  // when the form is first rendered, isDirty will be false. When you change a value, it will be true. because ALL of the default value don't match the form input values and never will be this instance.

//DOM Elements

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
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

// Mark form DIRTY when user interacts with INPUTS
const resetFormBtn = document.getElementById("resetFormBtn");

// Updates the reset button state based on whether the form contains unsaved changes.
function updateResetButtonState() {
    resetFormBtn.disabled = !isFormDirty;
}

// Marks the form as modified whenever the user changes any input field.
function markFormDirty() {
    isFormDirty = true;
    updateResetButtonState();
}
const formInputs = [firstName, middleName, lastName, email, mobile, birthDate, enableAbout, aboutMe];

formInputs.forEach(input => {
    input.addEventListener("input", markFormDirty);
    input.addEventListener("change", markFormDirty);
});
gender.forEach(radio => {
    radio.addEventListener("change", markFormDirty);
});

// Displays the registration form for adding or editing a student and initializes 
// the form with the appropriate data.
function showForm(editMode, index = null) {
    clearErrors();
    document.getElementById("studentForm").reset();
    aboutMeGroup.style.display = "none";
    charCount.textContent = "0";
    isFormDirty = false;
    updateResetButtonState();

    if (editMode) {
        editIndex = index;
        document.getElementById("formTitle").textContent = "Edit Student Details";
        document.getElementById("submitFormBtn").textContent = "UPDATE";
        populateForm(students[index]);
    } else {
        editIndex = null;
        document.getElementById("formTitle").textContent = "Student Registration Form";
        document.getElementById("submitFormBtn").textContent = "REGISTER";
    }

    document.getElementById("tableView").classList.add("hidden");
    document.getElementById("formView").classList.remove("hidden");
}

// Hides the form, resets editing state, and returns to the student table view.
function hideForm() {
    document.getElementById("formView").classList.add("hidden");
    document.getElementById("tableView").classList.remove("hidden");
    editIndex = null;
    isFormDirty = false;
    renderTable();
}

// Populates the form fields with an existing student's data for editing
function populateForm(student) {
    firstName.value = student.firstName;
    middleName.value = student.middleName;
    lastName.value = student.lastName;

    gender.forEach(radio => {
        if (radio.value === student.gender) {
            radio.checked = true;
        }
    });

    email.value = student.email;
    mobile.value = student.mobile;
    birthDate.value = student.birthDate;

    if (student.aboutMe) {
        enableAbout.checked = true;
        aboutMeGroup.style.display = "block";
        aboutMe.disabled = false;
        aboutMe.value = student.aboutMe;
        charCount.textContent = student.aboutMe.length;
    } else {
        enableAbout.checked = false;
        aboutMeGroup.style.display = "none";
        aboutMe.disabled = true;
        aboutMe.value = "";
        charCount.textContent = "0";
    }
    isFormDirty = false;
    updateResetButtonState();
}

// Navigation Events
document.getElementById("showAddFormBtn").addEventListener("click", () => {
    showForm(false);
});

document.getElementById("cancelFormBtn").addEventListener("click", () => {
    if (isFormDirty) {
        const confirmCancel = confirm("You have unsaved changes. Are you sure you want to cancel?");
        if (!confirmCancel) return;
    }
    hideForm();
});

document.getElementById("resetFormBtn").addEventListener("click", () => {
    const confirmReset = confirm("Are you sure you want to reset the form?");
    if (confirmReset) {
        document.getElementById("studentForm").reset();
        aboutMeGroup.style.display = "none";
        charCount.textContent = "0";
        clearErrors();
        isFormDirty = false;
        updateResetButtonState();
    }
});

// Display a temporary toast notification to inform the user about successful submitting.
// Toast notification trigger
function showToast(message) {
    const toast = document.getElementById("toastNotification");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

// Validates all form fields, creates, or updates a student record
// and saves the data to localStorage
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
        const studentData = {
            firstName: firstName.value.trim(),
            middleName: middleName.value.trim(),
            lastName: lastName.value.trim(),
            gender: document.querySelector('input[name="gender"]:checked').value,
            email: email.value.trim(),
            mobile: mobile.value.trim(),
            birthDate: birthDate.value.trim(),
            aboutMe: enableAbout.checked ? aboutMe.value.trim() : ""
        };

        if (editIndex !== null) {
            students[editIndex] = studentData;
            showToast("Student record updated successfully!");
        } else {
            students.push(studentData);
            showToast("Student registered successfully!");
        }

        localStorage.setItem("students", JSON.stringify(students));
        isFormDirty = false;
        hideForm();
    }
}

// Global CRUD callbacks (attached to window for row element onClick triggers)
window.editStudent = function(index) {
    showForm(true, index);
};

window.deleteStudent = function(index) {
    const confirmDelete = confirm("Are you sure you want to delete this student record?");
    if (confirmDelete) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        showToast("Student record deleted successfully!");

        // Handle page adjustment after row deletion
        const filtered = getFilteredAndSortedStudents();
        const totalPages = Math.ceil(filtered.length / rowsPerPage);
        if (currentPage > totalPages && currentPage > 1) {
            currentPage = totalPages;
        }

        renderTable();
    }
};

// Filters the student list based on the search query and sorts the results
// according to the student column and direction 

// Filter and Sort Processing
function getFilteredAndSortedStudents() {
    // Map with original indices so Edit and Delete affect the correct localStorage entry
    let result = students.map((student, originalIndex) => ({ ...student, originalIndex }));
    
    // 1. Filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(student => {
            // console.log(student.birthDate, query);
            return student.firstName.toLowerCase().includes(query) ||
            student.lastName.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query) ||
            student.mobile.toLowerCase().includes(query) ||
            new Date(student.birthDate).toLocaleDateString('en-GB').includes(query)
        }
            
        );
    }
    
    // 2. Sort
    result.sort((a, b) => {
        let valA = a[sortColumn] ? a[sortColumn].toString().toLowerCase() : "";
        let valB = b[sortColumn] ? b[sortColumn].toString().toLowerCase() : "";
        
        if (sortColumn === "birthDate") {
            valA = a.birthDate ? new Date(a.birthDate) : new Date(0);
            valB = b.birthDate ? new Date(b.birthDate) : new Date(0);
        }
        
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    
    return result;
}

// Renders the student table with filtering, sorting, paginnatiiooon, 
// and action buttons for editing and deleting records.

// Render dynamic rows, headers, and pagination details
function renderTable() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";
    
    const filteredAndSorted = getFilteredAndSortedStudents();
    const totalItems = filteredAndSorted.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
    
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    
    // Enable/Disable pagination buttons
    document.getElementById("prevPageBtn").disabled = (currentPage === 1);
    document.getElementById("nextPageBtn").disabled = (currentPage === totalPages);
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Slice page subset
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
    const pageData = filteredAndSorted.slice(startIndex, endIndex);
    
    // Update sort classes on header cells
    document.querySelectorAll(".student-table th.sortable").forEach(th => {
        const col = th.dataset.column;
        th.classList.remove("sorted-header", "sort-asc", "sort-desc");
        
        if (col === sortColumn) {
            th.classList.add("sorted-header");
            th.classList.add(sortDirection === "asc" ? "sort-asc" : "sort-desc");
        }
    });
    
    // Render no records indicator if empty
    if (totalItems === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="no-records">No Records Found</td>
            </tr>
        `;
        return;
    }
    
    // Add records to the grid
    pageData.forEach((student, index) => {
        const row = document.createElement("tr");
        const srNo = startIndex + index + 1;
        
        const getColClass = (colName) => {
            return colName === sortColumn ? "sorted-column" : "";
        };
        
        row.innerHTML = `
            <td class="${getColClass("srNo")}">${srNo}</td>
            <td class="${getColClass("firstName")}">${student.firstName}</td>
            <td class="${getColClass("lastName")}">${student.lastName}</td>
            <td class="${getColClass("gender")}">${student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}</td>
            <td class="${getColClass("email")}">${student.email}</td>
            <td class="${getColClass("mobile")}">${student.mobile}</td>
            <td class="${getColClass("birthDate")}">${formatDate(student.birthDate)}</td>
            <td class="${getColClass("aboutMe")} col-about-me" title="${student.aboutMe || '-'}">${student.aboutMe || "-"}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editStudent(${student.originalIndex})" class="btn-action btn-edit">Edit</button>
                    <button onclick="deleteStudent(${student.originalIndex})" class="btn-action btn-delete">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Converts a data from YYYY-MM-DD format into DD-MM-YYYY
function formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Search box listener
document.getElementById("searchBox").addEventListener("input", function(e) {
    searchQuery = e.target.value;
    currentPage = 1;
    renderTable();
});

// Sortable headers click listeners
document.querySelectorAll(".student-table th.sortable").forEach(th => {
    th.addEventListener("click", () => {
        const col = th.dataset.column;
        if (sortColumn === col) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortColumn = col;
            sortDirection = "asc";
        }
        renderTable();
    });
});

// Pagination click handlers
document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

document.getElementById("nextPageBtn").addEventListener("click", () => {
    const filtered = getFilteredAndSortedStudents();
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});


// Displays a validation error message for the specified form field.
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

// Initial Draw 
renderTable();