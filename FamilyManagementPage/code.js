let users = new Array();
let user_count = 0;

document.getElementById('create-button').addEventListener('click', add_user);
document.getElementById('deleteButton').addEventListener('click', delete_user);

document.querySelector('#closeMember').addEventListener('click', function() {
    document.getElementById('member-form').reset();
    document.getElementById('new-member-popup').style.display = 'none';
});
document.querySelector('#closeUnselected').addEventListener('click', function() {
    document.getElementById('unselectedPopup').style.display = 'none';
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
function setCaretPosition(elem, caretPos) {
    if (elem !== null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else
                elem.focus();
        }
    }
}

function editItem(button) {
    let section = button.parentNode;
    let spans = section.getElementsByTagName("span");

    for (let i = 0; i < spans.length; i++) {
        // Make spans contenteditable
        spans[i].setAttribute("contenteditable", "true");
        spans[i].style.border = "1px solid #ccc";
        spans[i].style.padding = "5px";
        if (i === 0) spans[i].focus();

        // Attach input event listener with restrictions
        spans[i].addEventListener('input', function(e) {
            const originalContent = this.innerText;
            let caretPosition = document.getSelection().anchorOffset;
            let newText = originalContent;
            if (this.classList.contains('name') || this.classList.contains('allergy')) {
                // Allow only letters for names and allergies
                newText = originalContent.replace(/[^a-zA-Z\s]/g, '');
            } else if (this.classList.contains('age')) {
                // Allow only numbers for age
                newText = originalContent.replace(/[^\d]/g, '');
            } else if (this.classList.contains('cookingLevel')) {
                // Allow only numbers 1-3 for cooking level
                newText = originalContent.replace(/[^1-3]/g, '');
            }

            if (newText !== originalContent) {
                e.preventDefault();
                this.innerText = newText;
                // Attempt to restore the caret position
                setCaretPosition(this, caretPosition - 1);
            }
        });

        // Attach a blur event listener to save changes
        spans[i].addEventListener('blur', function() {
            saveEditOnBlur(this);
        });
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
    <p>Name: <span class="name" id="user${user_count}Name">${name}</span></p>
    <p>Age: <span class="age" id="user${user_count}Age">${age}</span></p>
    <p>Cooking Level: <span class="cookingLevel" id="user${user_count}CookingLevel">${level}</span></p>
    <p>Allergy: <span class="allergy" id="user${user_count}Allergy">${allergy}</span></p>

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
        let popup = document.getElementById("unselectedPopup");
        popup.style.display ='block';
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


