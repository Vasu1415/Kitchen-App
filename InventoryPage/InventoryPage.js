document.addEventListener("DOMContentLoaded", loadInventory);

function loadInventory() {
    const inventoryData = JSON.parse(sessionStorage.getItem("invData"));
    console.log('Loaded Inventory Data:', inventoryData);
    if (inventoryData && inventoryData.length) {
        const table = document.getElementById("tableBody");
        if (!table) {
            console.error('Table body not found');
            return;
        }
        table.innerHTML = ''; 
        inventoryData.forEach(item => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${item.item_name}</td>
                <td contenteditable="true">${item.quantity}</td>
                <td>${item.category}</td>
                <td>${item.expirationDate}</td>
                <td>${item.person_name}</td>
            `;
            table.appendChild(newRow);
        });
    } else {
        console.log('No inventory data or empty inventory');
    }
}


function displayErrorModal() {
    document.getElementById('errorText').innerHTML = 'You have no items in your shopping list! Would you like to visit the page?';
    document.getElementById('errorModal').style.display = 'block';
}

function closeModals(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function confirmVisitShoppingList() {
    window.location.href = '../ShoppingPage/ShoppingPage.html'; 
}

function declineVisitShoppingList() {
    closeModals('errorModal');
}

function addToInventoryFromShoppingList() {
    const shoppingListItems = JSON.parse(sessionStorage.getItem('items'));
    if (!shoppingListItems || shoppingListItems.length < 1) {
        displayErrorModal(); 
        return;
    }

    let table = document.getElementById("tableBody");
    shoppingListItems.forEach(item => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
            <td>${getCurrentDatePlusOneMonth()}</td>
            <td>${item.person_name}</td>
        `;
        table.appendChild(newRow);
    });

    const inventoryItems = JSON.parse(sessionStorage.getItem("invData")) || [];
    const updatedInventory = [...inventoryItems, ...shoppingListItems];
    sessionStorage.setItem("invData", JSON.stringify(updatedInventory));
    sessionStorage.removeItem('items');
}


function getCurrentDatePlusOneMonth() {
    var currentDate = new Date();
    var nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    return nextMonthDate.toDateString();
}

function openModal() {
    clearInput('itemName');
    clearInput('quantity');
    clearInput('category');
    clearInput('expirationDate');
    clearInput('person');
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function clearInput(id) {
    document.getElementById(id).value = "";
}

let new_items = [];

function addItemManually() {
    var itemName = document.getElementById("itemName").value.trim();
    var quantity = document.getElementById("quantity").value.trim();
    var category = document.getElementById("category").value;
    var expirationDate = document.getElementById("expirationDate").value.trim();
    var person = document.getElementById("person").value.trim();

    // Basic validation to ensure no empty values are added
    if (!itemName || !quantity || category === '' || !expirationDate || !person) {
        alert('Please fill all fields correctly.');
        return;
    }

    var newItem = {
        item_name: itemName,
        quantity: quantity,
        category: category,
        expirationDate: expirationDate,
        person_name: person
    };

    var inventoryItems = JSON.parse(sessionStorage.getItem("invData")) || [];
    inventoryItems.push(newItem);
    sessionStorage.setItem("invData", JSON.stringify(inventoryItems));
    console.log(sessionStorage.getItem("invData"));
    addRowToTable(newItem);
    closeModal();
}


function addRowToTable(item) {
    var tableBody = document.getElementById("tableBody");
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${item.item_name}</td>
        <td contenteditable="true">${item.quantity}</td>
        <td>${item.category}</td>
        <td>${item.expirationDate}</td>
        <td>${item.person_name}</td>
    `;
    tableBody.appendChild(newRow);
}


function search() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var tableRows = document.querySelectorAll("#inventoryTable tbody tr");

    tableRows.forEach(row => {
        var item = row.cells[0].textContent.toLowerCase();
        var category = row.cells[2].textContent.toLowerCase();
        var person = row.cells[4].textContent.toLowerCase();

        if (item.includes(searchInput) || category.includes(searchInput) || person.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function enableEdit(id) {
    var element = document.getElementById(id);
    element.setAttribute('contenteditable', element.getAttribute('contenteditable') === 'true' ? 'false' : 'true');
    element.focus();
}
