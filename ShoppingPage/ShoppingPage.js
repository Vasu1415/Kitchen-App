let items = []

function addItem() {
    let item_name = document.querySelector("#item-name").value;
    let quantity = document.querySelector("#quantity-count").value;
    let person_name = document.querySelector("#person-name").value;
    let category = document.querySelector("#item-category").value;
    let current_date = new Date();
    let expiry_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate());

    items.push((item_name,quantity,person_name,category,expiry_date));
    let error = "";
    // Checking for all potential errors to be fixed
    if (item_name == "" || quantity == "" || person_name == "" || category == "") {
        error += "User didn't input values for all the fields.\n";
    }
    if (isNaN(quantity) || !Number.isInteger(parseFloat(quantity))) {
        error += "User has entered a non integer value.\n";
    }
    if (/\d/.test(person_name)) {
        error += "The name field must only contain string characters.\n";
    }
    if (category !== "fridge" && category !== "pantry-item"){
        error += "The only possible categories are fridge and pantry-item.\n";
    }
    if (error !== ""){
        alert(error);
        return;
    }
    const myArray = [item_name,quantity,person_name,category];
    const table = document.querySelector("#shopping-class");
    items.push(item_name);
    localStorage.setItem(item_name,JSON.stringify(myArray));
    localStorage.setItem("1",JSON.stringify(items));
    
    const tableRows = Array.from(document.getElementById("shopping-class").getElementsByTagName("tr"));
    const tableData = tableRows.map(row => Array.from(row.children).map(cell => cell.textContent));
    localStorage.setItem("shoppingData", JSON.stringify(tableData));
        // Array of available icon classes
    const foodIcons = ["fas fa-apple-alt fa-lg", "fas fa-banana fa-lg", "fas fa-carrot fa-lg", 
                        "fas fa-grapes fa-lg", "fas fa-lemon fa-lg", "fas fa-pepper-hot fa-lg",  
                        "fas fa-kiwi-bird fa-lg", "fas fa-bread-slice fa-lg", "fas fa-cheese fa-lg", 
                        "fas fa-egg fa-lg", "fas fa-utensils fa-lg"];
    // Search if the icon for the item exists
    let icon_generated = "";
    icon_generated = foodIcons.find(icon => icon.includes(item_name.toLowerCase()));
    if (icon_generated === undefined) {
        icon_generated = "fas fa-tools fa-lg"
    }
    let newRowContent = `
        <td>
            <div class = "icon-generated">
                <i class="${icon_generated}"></i>
            </div>
            <div class = "item-details">
                Item Name: <span>${item_name}</span><br>
                Quantity: <span>${quantity}</span><br>
                Person: <span>${person_name}</span><br>
                Category: <span>${category}</span>
            </div>
            <div class = "purchased">
                <span class = "purchase"></span>
            </div>
            <div class = "options">
                <i class="fas fa-pencil-alt edit-icon fa-lg" onclick="editItem(this)"></i>
                <i class="fas fa-trash delete-icon fa-lg" onclick="deleteItem(this)"></i>
                <i class="fas fa-check validate-icon fa-lg" onclick="validateItem(this)"></i>
            </div>
        </td>
    `;

    // Create a new row in the table and set its content
    let current_table = document.querySelector("#shopping-class");
    let new_row = current_table.insertRow();
    new_row.innerHTML = newRowContent;

    // Clear input fields
    document.querySelector("#item-name").value = "";
    document.querySelector("#quantity-count").value = "";
    document.querySelector("#person-name").value = "";
    document.querySelector("#item-category").value = "";
    
}

function deleteItem(element) {
    let row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editItem(element) {
    let row = element.parentNode.parentNode;
    let spans = row.getElementsByTagName("span");

    // Enable editing for each span
    for (let i = 0; i < spans.length; i++) {
        spans[i].setAttribute("contenteditable", "true");
    }
}

function validateItem(element) {
    let row = element.parentNode.parentNode;
    let purchaseSpan = row.querySelector('.purchased .purchase');
    if (purchaseSpan) {
        purchaseSpan.textContent = "PURCHASED";
    }
}
