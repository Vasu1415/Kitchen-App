let users = new Array();
let user_count = 0;
function display_popup(show) {
    let popup = document.getElementById("editPopup");
    popup.style.display = show ? 'block' : 'none';
}
function save_details(){
  // Gets the values from the form fields
  let name = document.getElementById('editName').value;
  let age = document.getElementById('editAge').value;
  let level = document.getElementById('editLevel').value;
  let allergy = document.getElementById('editAllergy').value;
  
  // Logic to save the details goes here
  document.querySelector("#adminName").innerHTML = name;
  document.querySelector("#adminAge").innerHTML = age;
  document.querySelector("#adminCookingLevel").innerHTML = level;
  document.querySelector("#adminAllergy").innerHTML = allergy;
  // Close the popup after saving
  display_popup(false);
}
//keeps track and populates the other members of the app
function display_users(){
    if(user_count > 0){
        document.querySelector("#members").innerHTML = "<p>No new members here...</p>";
    }else{
        document.querySelector("#members").innerHTML = "<p>No new members here...</p>";
    }
}

function edit_profile(){

}

function show_info(){

}

function add_user(){

}

function delete_user(){

}


/*
            <img class="pfp"src="admin_avatar.png.jpg" alt="Admin">
            <p>Name: <span id="adminName">...</span></p>
            <p>Age: <span id="adminAge">...</span></p>
            <p>Cooking Level: <span id="adminCookingLevel">...</span></p>
            <p>Allergy: <span id="adminAllergy">...</span></p>
            <button>Edit Details</button>
 */