let users = new Array();
let user_count = 0;

document.getElementById('create-button').addEventListener('click', add_user);

document.querySelector('#closeEdit').addEventListener('click', function() {
    document.getElementById('editForm').reset();
    document.getElementById('editPopup').style.display = 'none';
});
document.querySelector('#closeMember').addEventListener('click', function() {
    document.getElementById('member-form').reset();
    document.getElementById('new-member-popup').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest('.editUser');
        if (button) {
            const userId = button.getAttribute('data-userid');
            display_user_edit_popup(userId);
        }
    });
});
//NEED TO FIX TO EDIT OTHER THINGS
function display_user_edit_popup(userId) {
    // Show the popup
    display_popup(true);
    // Store the current userId being edited, so save_details knows which user to update
    document.getElementById('editPopup').setAttribute('data-currentuser', userId);
}

function display_member_popup(show) {
    let popup = document.getElementById("new-member-popup");
    popup.style.display = show ? 'block' : 'none';
}

function display_popup(show) {
    let popup = document.getElementById("editPopup");
    popup.style.display = show ? 'block' : 'none';
}

function save_details(){
    // Get the current user being edited from the data attribute
    const userId = document.getElementById('editPopup').getAttribute('data-currentuser');
    
    // Gets the values from the form fields
    let name = document.getElementById('editName').value;
    let age = document.getElementById('editAge').value;
    let level = document.getElementById('editLevel').value;
    let allergy = document.getElementById('editAllergy').value;
    
    // Selector prefix to target the correct elements based on whether we're editing the admin or another user
    let selectorPrefix = userId ? `#user${userId}` : "#admin";
    
    // Update the details in the UI and handling empty entries
    if (name.trim() !== "") {
        console.log(`${selectorPrefix}Name`)
        document.querySelector(`${selectorPrefix}Name`).innerText = name;
    }
    
    //TODO: need to fix the bottom 3 and get it working similar to how the name is now. 
    // Check and update age if not empty
    if (age.trim() !== "") {
        document.querySelector(`${selectorPrefix}Age`).innerText = age;
    }

    // Check and update cooking level if not empty
    if (level.trim() !== "") {
        document.querySelector(`${selectorPrefix}CookingLevel`).innerText = level;
    }

    // Check and update allergy if not empty
    if (allergy.trim() !== "") {
        document.querySelector(`${selectorPrefix}Allergy`).innerText = allergy;
    }

    // Change the profile picture if a new picture was uploaded
    let fileInput = document.getElementById('editImageUpload');
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            // Update the source of the profile picture image
            // Need to handle selecting the right ".pfp" for the user being edited
            if (userId) {
                // If editing a user, find the user's profile picture by a more specific selector, possibly using the user ID
                document.querySelector(`#userPfp${userId}`).src = e.target.result;
            } else {
                // If editing the admin, use a general selector
                document.querySelector(".pfp").src = e.target.result;
            }
        };

        // Read the image file as a data URL.
        reader.readAsDataURL(fileInput.files[0]);
    }
    //reset form after saving
    document.getElementById('editForm').reset();
    // Close the popup after saving
    display_popup(false);
}


function add_user(){
user_count++;
let editButtonHtml = `<button class="editUser" data-userid="${user_count}"><img src="edit-pencil.png" alt="buttonpng"/></button>`;
// Retrieve the vals from the popup form
let name = document.getElementById('memberName').value;
let age = document.getElementById('memberAge').value;
let level = document.getElementById('memberLevel').value;
let allergy = document.getElementById('memberAllergy').value;
let imageUpload = document.getElementById('newMemberImageUpload').files[0]; // Adjusted ID for image upload

// Create the new member element
let memberDiv = document.createElement('div');
memberDiv.className = 'section';
let imgElement = document.createElement('img');
imgElement.className = 'pfp';

// Default profile picture if none is selected
imgElement.src = "admin_avatar.png.jpg";
imgElement.alt = "Profile Picture";

//TODO:Set span ids for the other attributes
let memberDetails = `
    ${editButtonHtml}
    <p>Name: <span id="user${user_count}Name">${name}</span></p>
    <p>Age: <span id="user${user_count}Age">${age}</span></p>
    <p>Cooking Level: <span id="user${user_count}CookingLevel">${level}</span></p>
    <p>Allergy: <span id="user${user_count}Allergy">${allergy}</span></p>
    <p class="user_name">User Number ${user_count}</p>

`;
// Check if an image was uploaded
if (imageUpload) {
    var reader = new FileReader();

    reader.onload = function(e) {
        // Set the uploaded image as profile picture
        imgElement.src = e.target.result;

        // Append elements after image is loaded
        memberDiv.appendChild(imgElement);
        memberDiv.innerHTML += memberDetails;
        document.getElementById('other-users').appendChild(memberDiv);
    };

    // Read the image file as a data URL.
    reader.readAsDataURL(imageUpload);
} else {
    // Append elements directly if no image is uploaded
    memberDiv.appendChild(imgElement);
    memberDiv.innerHTML += memberDetails;
    document.getElementById('other-users').appendChild(memberDiv);
}

// Reset the form for next input and close the popup
document.getElementById('member-form').reset();
display_member_popup(false);
}

function delete_user(){

}

