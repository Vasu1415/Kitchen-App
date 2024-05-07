let items = [];

function addItem() {
    let item_name = document.querySelector("#item-name").value.trim();
    let quantity = document.querySelector("#quantity-count").value.trim();
    let person_name = document.querySelector("#person-name").value.trim();
    let category = document.querySelector("#item-category").value.trim();
    let current_date = new Date();
    let expiry_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate());

    items.push((item_name, quantity, person_name, category, expiry_date));
    let error = "";

    if (item_name === "" || quantity === "" || person_name === "" || category === "") {
        error += "User didn't input values for all the fields.\n";
    }
    if (isNaN(quantity) || !Number.isInteger(parseFloat(quantity))) {
        error += "User has entered a non-integer value for quantity.\n";
    }
    if (/\d/.test(person_name)) {
        error += "The name field must only contain string characters.<br>\n";
    }
    // if (category !== "fridge" && category !== "pantry-item") {
    //     error += "The only possible categories are 'fridge' and 'pantry-item'.\n";
    // }
    if (error !== "") {
        displayError(error);
        return;
    }
    
    const myArray = [item_name, quantity, person_name, category];
    const table = document.querySelector("#shopping-class");
    items.push(item_name);
    localStorage.setItem(item_name, JSON.stringify(myArray));
    localStorage.setItem("1", JSON.stringify(items));

    const tableRows = Array.from(document.getElementById("shopping-class").getElementsByTagName("tr"));
    const tableData = tableRows.map(row => Array.from(row.children).map(cell => cell.textContent));
    localStorage.setItem("shoppingData", JSON.stringify(tableData));

    let newRowContent = `
        <td>
            <div class = "item-details-1">
                Item Name: <span>${item_name}</span><br>
                Item Category: <span>${category}</span><br>
                Person: <span>${person_name}</span><br>
                Quantity: <span>${quantity}</span><br>
            </div>
            <div class = "purchased">
                <span class = "purchase"></span>
            </div>
            <div class = "options">
                <img src = "icons/pencil.png" alt ="editor" class="edit-icon" onclick="editItem(this)">
                <img src = "icons/garbage.png" alt ="trash bin" class="delete-icon" onclick="deleteItem(this)">
                <img src = "icons/correct.png" alt ="validation" class="validate-icon" onclick="validateItem(this)">                
            </div>
        </td>
    `;

    let current_table = document.querySelector("#shopping-class");
    let new_row = current_table.insertRow();
    new_row.innerHTML = newRowContent;

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

function displayItem() {
    var contentToToggle = document.querySelectorAll('.left-section,.right-section,.add-item-button');
    contentToToggle.forEach(function (element) {
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

function increaseQuantity() {
    var quantityInput = document.getElementById('quantity-count');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    var quantityInput = document.getElementById('quantity-count');
    var currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function displayError(errorMessage) {
    document.getElementById('errorText').textContent = errorMessage;
    document.getElementById('errorModal').style.display = 'block';
}

function closeModals(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
