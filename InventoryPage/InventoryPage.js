let new_items = [];
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
            new_items.push(item_name); 
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
        updateInventory();
    }
    // const key_checker = "3";
    // if (check_key_presence(key_checker)){
    //     const current_inventory_items = JSON.parse(localStorage.getItem(key_checker));
    //     let new_item_arr = [...current_inventory_items,...new_items];
    //     localStorage.setItem("3",JSON.stringify(new_item_arr));
    // }else{
    //     localStorage.setItem("3",JSON.stringify(new_items));
    // }
    // new_item_arr = [];
}


function check_key_presence(key){
    return localStorage.getItem(key) !== null;
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
    const itemName = document.getElementById("itemName").value;
    const quantity = document.getElementById("quantity").value;
    const category = document.getElementById("category").value;
    const expirationDate = document.getElementById("expirationDate").value;
    const person = document.getElementById("person").value;

    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${quantity}</td>
        <td>${category}</td>
        <td>${expirationDate}</td>
        <td>${person}</td>
    `;
    tableBody.appendChild(newRow);

    updateInventory();
    closeModal();
}

// function addItemManually() {
//     var itemName = document.getElementById("itemName").value;
//     var quantity = document.getElementById("quantity").value;
//     var category = document.getElementById("category").value;
//     var expirationDate = document.getElementById("expirationDate").value;
//     var person = document.getElementById("person").value;
//     new_items.push(itemName);
//     var tableBody = document.getElementById("tableBody");
//     var newRow = document.createElement("tr");
//     newRow.innerHTML = `
//         <td>${itemName}</td>
//         <td>${quantity}</td>
//         <td>${category}</td>
//         <td>${expirationDate}</td>
//         <td>${person}</td>
//     `;
//     tableBody.appendChild(newRow);
//     const key_checker = "3";
//     if (check_key_presence(key_checker)){
//         const current_inventory_items = JSON.parse(localStorage.getItem(key_checker));
//         let new_item_arr = [...current_inventory_items,...new_items];
//         localStorage.setItem("3",JSON.stringify(new_item_arr));
//     }else{
//         localStorage.setItem("3",JSON.stringify(new_items));
//     }
//     new_item_arr = [];

//     // Close the modal after adding the item
//     updateInventory();
//     closeModal();
// }

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

function updateInventory() {
    const tableRows = document.querySelectorAll("#tableBody tr");
    const inventoryData = [];

    tableRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const item = [
            cells[0].textContent,
            cells[1].textContent,
            cells[2].textContent,
            cells[3].textContent,
            cells[4].textContent
        ];
        inventoryData.push(item);
    });

    localStorage.setItem("3", JSON.stringify(inventoryData));
}


function filterBy() {
    var filterType = document.getElementById("filterType").value;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("inventoryTable");
    switching = true;
  
    // Loop until no switching has been done
    while (switching) {
        switching = false;
        rows = table.rows;
        // Loop through all table rows (except the header)
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            // Get the two elements you want to compare
            x = rows[i].getElementsByTagName("TD")[getIndex(filterType)].innerText.toLowerCase();
            y = rows[i + 1].getElementsByTagName("TD")[getIndex(filterType)].innerText.toLowerCase();
            // Check if the two rows should switch places
            if (filterType.includes("LowHigh")) {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else if (filterType.includes("HighLow")) {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// Function to get index based on filter type
function getIndex(filterType) {
    switch (filterType) {
        case "quantityLowHigh":
        case "quantityHighLow":
            return 1; // Index for Quantity column
        case "category":
            return 2; // Index for Category column
        case "expirationLowHigh":
        case "expirationHighLow":
            return 3; // Index for Expiration Date column
        case "person":
            return 4; // Index for Person column
        default:
            return 0; // Default index (shouldn't happen)
    }
}

