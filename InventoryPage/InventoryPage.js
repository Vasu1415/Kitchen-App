function addToShoppingListFromShoppingPage() {
    const retrievedArray = JSON.parse(localStorage.getItem("1"));
    let shopping_lst = [];
    for (let i = 0; i < retrievedArray.length; i++){
        if(i%2 == 0){
            continue;
        }else{
            shopping_lst.push(retrievedArray[i]);
        }
    }
    if (shopping_lst.length < 1){
        alert("No items have been currently added to the item list");
    }else{
        let table = document.getElementById("tableBody");
        for (let i = 0; i < (shopping_lst.length); i++){
            current_item = shopping_lst[i];
            item_details = JSON.parse(localStorage.getItem(current_item));
            console.log(item_details)
            let item_name = item_details[0]; 
            let item_quantity = item_details[1];
            let person_name = item_details[2];
            let category = item_details[3];
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
                   <td>${item_name}</td>
                   <td>${item_quantity}</td>
                   <td>${category}</td>
                   <td>${getCurrentDatePlusOneMonth()}</td>             
                   <td>${person_name}</td>`;
            console.log(newRow);
            table.appendChild(newRow);
        }
    }
}

function rebuildShoppingTable() {
    const tableData = JSON.parse(localStorage.getItem("shoppingData"));
    const table = document.getElementById("shopping-class");
    tableData.forEach(rowData => {
        const newRow = document.createElement("tr");
        rowData.forEach(cellData => {
            const newCell = document.createElement("td");
            newCell.textContent = cellData;
            newRow.appendChild(newCell);
        });
        table.appendChild(newRow);
    });
    return table;
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
