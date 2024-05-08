let items = [];

function addItem(event) {
    event.preventDefault();

    let item_name = document.querySelector("#itemName").value.trim();
    let quantity = document.querySelector("#itemQuantity").value.trim();
    let person_name = document.querySelector("#personName").value.trim();
    let category = document.getElementById('item-category').value.trim();
    let current_date = new Date();
    let expiry_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate());

    items.push({item_name, quantity, person_name, category, expiry_date});
    let error = "";

    if (item_name === "" || quantity === "" || person_name === "" || category === "") {
        error += "User didn't input values for all the fields.\n";
    } else {
        if (/\d/.test(item_name)) {
            error += "The item name field must only contain string characters.";
        }
        if (/\d/.test(person_name)){
            error += "The name field must only contain string characters.";
        }
    }
    if (isNaN(quantity) || !Number.isInteger(parseFloat(quantity))) {
        error += "User has entered a non-integer value for quantity.\n";
    } else {
        if (quantity <= 0){
            error += "User must buy at least 1 item when adding items to the shopping list.";
        }
    }
    if (error !== "") {
        displayError(error);
        return;
    }

    sessionStorage.setItem('items', JSON.stringify(items));

    const myArray = [item_name, quantity, person_name, category];
    const table = document.querySelector("#shopping-class");

    const tableRows = Array.from(document.getElementById("shopping-class").getElementsByTagName("tr"));
    const tableData = tableRows.map(row => Array.from(row.children).map(cell => cell.textContent));
    sessionStorage.setItem("shoppingData", JSON.stringify(tableData));

    let newRowContent = `
    <td>
        <div class="item-details-1">
            Item Name: <span>${item_name}</span><br>
            Item Category: <span>${category}</span><br>
            Person: <span>${person_name}</span><br>
            Quantity: <span>${quantity}</span><br>
        </div>
        <div class="purchased">
            <span class="purchase"></span>
        </div>
        <div class="options">
            <img src="icons/pencil.png" alt="editor" class="edit-icon" onclick="editItem(this)">
            <button class="delete-button" onclick="confirmDelete(this)">
                <img src="icons/delete.png" alt="trash bin" class="delete-icon">
            </button>
            <img src="icons/buy.png" alt="validation" class="validate-icon" onclick="validateItem(this)">                
        </div>
    </td>
    `;

    let current_table = document.querySelector("#shopping-class");
    let new_row = current_table.insertRow();
    new_row.innerHTML = newRowContent;

    document.querySelector("#itemName").value = "";
    document.querySelector("#itemQuantity").value = "";
    document.querySelector("#personName").value = "";
    document.querySelector("#item-category").value = "";
}

let currentElement = null;

function confirmDelete(element) {
    currentElement = element;
    document.getElementById('confirmModal').style.display = 'block';
}

function deleteItem2(element) {
    let row = element.parentNode.parentNode.parentNode; // Locate the row element in the DOM
    let index = row.rowIndex - 1; // Calculate index assuming the table has a header row
    items.splice(index, 1); // Remove the item from the array at the calculated index

    sessionStorage.setItem('items', JSON.stringify(items)); // Update sessionStorage with the new items array

    row.parentNode.removeChild(row); // Remove the row from the table
    closeModals('confirmModal'); // Close the modal if it's open
}


function deleteItem(element) {
    let row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editItem(element) {
    let row = element.parentNode.parentNode;
    let spans = row.getElementsByTagName("span");

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

function displayItem() {
    document.getElementById('popupModal').style.display = 'block';
    return;
}

function displayError(errorMessage) {
    document.getElementById('errorText').textContent = errorMessage;
    document.getElementById('errorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('popupModal').style.display = 'none';
}

function closeModals(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve items from sessionStorage
    const storedItems = JSON.parse(sessionStorage.getItem('items'));
    if (storedItems && storedItems.length > 0) {
        items = storedItems;  // Update the items array
        updateTable();        // Update the table to show the items
    }
});
function updateTable() {
    const tableBody = document.querySelector("#shopping-class tbody");
    tableBody.innerHTML = '';  // Clear existing rows in the tbody element

    items.forEach(item => {
        let newRowContent = `
        <tr>
            <td>
                <div class="item-details-1">
                    Item Name: <span>${item.item_name}</span><br>
                    Item Category: <span>${item.category}</span><br>
                    Person: <span>${item.person_name}</span><br>
                    Quantity: <span>${item.quantity}</span><br>
                </div>
                <div class="purchased">
                    <span class="purchase"></span>
                </div>
                <div class="options">
                    <img src="icons/pencil.png" alt="editor" class="edit-icon" onclick="editItem(this)">
                    <button class="delete-button" onclick="confirmDelete(this)">
                        <img src="icons/delete.png" alt="trash bin" class="delete-icon">
                    </button>
                    <img src="icons/buy.png" alt="validation" class="validate-icon" onclick="validateItem(this)">
                </div>
            </td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', newRowContent);
    });
}
