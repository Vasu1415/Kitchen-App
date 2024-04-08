function addToShoppingListFromShoppingPage() {
    var shoppingTableRows = document.querySelectorAll(".shopping-list-display table tr");
    console.log(shoppingTableRows)
    if (shoppingTableRows.length > 0) {
        shoppingTableRows.forEach(function(row) {
            // Extract item details from each row
            var itemName = row.cells[0].textContent;
            var quantity = row.cells[1].textContent;
            var category = row.cells[2].textContent;
            var person = row.cells[3].textContent;

            // Add extracted details to the table in InventoryPage.html
            var tableBody = document.getElementById("tableBody");
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${itemName}</td>
                <td>${quantity}</td>
                <td>${category}</td>
                <td>${getCurrentDatePlusOneMonth()}</td>
                <td>${person}</td>
            `;
            tableBody.appendChild(newRow);
        });
        alert("Items added to Shopping List from Shopping Page.");
    } else {
        alert("No items found in the shopping list.");
    }
}

// Function to get the current date plus one month
function getCurrentDatePlusOneMonth() {
    var currentDate = new Date();
    var nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    return nextMonthDate.toDateString(); // Convert to a string representation of the date
}




// Function to open the modal
function openModal() {
    // Clear input fields when the modal is opened
    clearInput('itemName');
    clearInput('quantity');
    clearInput('category');
    clearInput('expirationDate');
    clearInput('person');

    document.getElementById("myModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Function to clear input fields
function clearInput(id) {
    document.getElementById(id).value = "";
}

// Function to add item manually
function addItemManually() {
    var itemName = document.getElementById("itemName").value;
    var quantity = document.getElementById("quantity").value;
    var category = document.getElementById("category").value;
    var expirationDate = document.getElementById("expirationDate").value;
    var person = document.getElementById("person").value;

    var tableBody = document.getElementById("tableBody");
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${quantity}</td>
        <td>${category}</td>
        <td>${expirationDate}</td>
        <td>${person}</td>
    `;
    tableBody.appendChild(newRow);

    // Close the modal after adding the item
    closeModal();
}

function search() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var tableRows = document.querySelectorAll("#inventoryTable tbody tr");

    tableRows.forEach(function(row) {
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
