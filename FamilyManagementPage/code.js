let users = new Array();
let user_count = 0;

document.getElementById('create-button').addEventListener('click', add_user);
document.getElementById('deleteButton').addEventListener('click', delete_user);

document.querySelector('#closeMember').addEventListener('click', function() {
    document.getElementById('member-form').reset();
    document.getElementById('new-member-popup').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest('.editUser');
        if (button) {
            editItem(button)
        }
    });
});

function display_member_popup(show) {
    let popup = document.getElementById("new-member-popup");
    popup.style.display = show ? 'block' : 'none';
}
function editItem(button) {
    let section = button.parentNode;
    let spans = section.getElementsByTagName("span");

    for (let i = 0; i < spans.length; i++) {
        // Check if the current span is the cooking level by a distinctive part of its id or another attribute
        if (spans[i].className.includes("cookingLevel")) {
            // Create a select element with options for cooking levels
            const select = document.createElement("select");
            select.innerHTML = `<option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>`;
            select.value = spans[i].innerText; // Set the current value based on the span's text
            
            // Style the select element similarly to the spans for consistency
            select.style.border = "1px solid #ccc";
            select.style.padding = "5px";

            // Replace the span with the select element
            spans[i].replaceWith(select);

            // Focus on the select element
            select.focus();

            // Save changes on blur
            select.addEventListener('blur', function() {
                saveEditOnBlur(this);
            });

            // Since the select replaces the span, there's no need to make the original span contenteditable
        } else {
            // Make other spans contenteditable as before
            spans[i].setAttribute("contenteditable", "true");
            spans[i].style.border = "1px solid #ccc";
            spans[i].style.padding = "5px";
            if (i === 0) spans[i].focus();

            // Attach a blur event listener to save changes
            spans[i].addEventListener('blur', function() {
                saveEditOnBlur(this);
            });
        }
    }
}

function saveEditOnBlur(span) {
    // This function gets called when editing is finished (user clicks away)
    span.setAttribute("contenteditable", "false");
    span.style.border = "none"; // Revert styling
}

function add_user(){
user_count++;
const images = ["chefpfp.jpeg", "memberpfp.jpeg"];
let editButtonHtml = `<button class="editUser" data-userid="${user_count}"><img src="edit-pencil.png" alt="buttonpng"/></button>`;
let checkboxHtml = `<input type="checkbox" class="deleteUserCheckbox" data-userid="${user_count}" />`;
// Retrieve the vals from the popup form
let name = document.getElementById('memberName').value;
let age = document.getElementById('memberAge').value;
let level = document.getElementById('memberLevel').value;
let allergy = document.getElementById('memberAllergy').value;

// Create the new member element
let memberDiv = document.createElement('div');
memberDiv.className = 'section';
memberDiv.id = `userSection${user_count}`;
let imgElement = document.createElement('img');
imgElement.className = 'pfp';

// Generate a random index based on the length of the images array
const randomIndex = Math.floor(Math.random() * images.length);

// Use the random index to select an image source
imgElement.src = images[randomIndex];
imgElement.alt = "Profile Picture";

//TODO:Set span ids for the other attributes
let memberDetails = `
    ${editButtonHtml}
    ${checkboxHtml}
    <p>Name: <span id="user${user_count}Name">${name}</span></p>
    <p>Age: <span id="user${user_count}Age">${age}</span></p>
    <p>Cooking Level: <span class="cookingLevel" id="user${user_count}CookingLevel">${level}</span></p>
    <p>Allergy: <span id="user${user_count}Allergy">${allergy}</span></p>

`;
    memberDiv.appendChild(imgElement);
    memberDiv.innerHTML += memberDetails;
    document.getElementById('other-users').appendChild(memberDiv);

// Reset the form for next input and close the popup
document.getElementById('member-form').reset();
display_member_popup(false);
}

function performDeletion(selectedUsers) {
    selectedUsers.forEach(checkbox => {
        const userId = checkbox.getAttribute('data-userid');
        const userElement = document.getElementById(`userSection${userId}`);
        if (userElement) {
            userElement.remove();
            user_count--;
        }
    });
}

function delete_user() {
    const selectedUsers = document.querySelectorAll('.deleteUserCheckbox:checked');

    if(selectedUsers.length === 0) {
        return;
    }

    // Showing confirmation popup
    document.getElementById('confirmPopup').style.display = 'block';

    // Handle button clicks
    document.getElementById('confirmYes').onclick = function() {
        performDeletion(selectedUsers);
        document.getElementById('confirmPopup').style.display = 'none'; // Hide the popup after confirming
    };
    document.getElementById('confirmNo').onclick = function() {
        document.getElementById('confirmPopup').style.display = 'none';
    };
}


