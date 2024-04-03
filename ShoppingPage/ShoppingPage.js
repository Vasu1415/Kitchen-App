function addItem(){
    let item_name = document.querySelector("#item-name").value;
    let quantity = document.querySelector("#quantity-count").value;
    let person_name = document.querySelector("#person-name").value;

    if (item_name == "" || quantity == "" || person_name == ""){
         alert("Invalid Input!");
         return;
    }
    let current_table = document.querySelector("#shopping-class");
    let new_row = current_table.insertRow();
    let item_cell = new_row.insertCell(0);
    let quantity_cell = new_row.insertCell(1);
    let name_cell = new_row.insertCell(2);

    item_cell.textContent = item_name;
    quantity_cell.textContent = parseInt(quantity);
    name_cell.textContent = person_name;

    item_cell.contentEditable = true;
    quantity_cell.contentEditable = true;
    name_cell.contentEditable = true;

    document.querySelector("#shopping-class").innerHTML = current_table.innerHTML;
}

