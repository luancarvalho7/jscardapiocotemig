const weekdaySelect = document.getElementById("weekday");
const menuItemInput = document.getElementById("menuItem");
const addButton = document.getElementById("addItem");
const editButton = document.getElementById("editItem");
const deleteButton = document.getElementById("deleteItem");
const menuTable = document.getElementById("menuTable");

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateButton = document.getElementById("calculateIMC");
const imcResult = document.getElementById("imcResult");

const menu = [
    [],
    [],
    [],
    [],
    []
];

let selectedItem = null;

addButton.addEventListener("click", () => {
    const index = parseInt(weekdaySelect.value);
    const item = menuItemInput.value;
    menu[index].push(item);
    menuItemInput.value = "";
    updateMenuTable();
});

editButton.addEventListener("click", () => {
    if (selectedItem) {
        const index = parseInt(weekdaySelect.value);
        const item = menuItemInput.value;
        menu[index][selectedItem.dataset.index] = item;
        selectedItem.textContent = item;
        clearSelection();
    }
});

deleteButton.addEventListener("click", () => {
    if (selectedItem) {
        const index = parseInt(weekdaySelect.value);
        menu[index].splice(selectedItem.dataset.index, 1);
        updateMenuTable();
        clearSelection();
    }
});

menuTable.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        clearSelection();
        selectedItem = event.target;
        selectedItem.classList.add("selected");
        menuItemInput.value = selectedItem.textContent;
        weekdaySelect.value = selectedItem.parentNode.parentNode.dataset.day;
        editButton.disabled = false;
        deleteButton.disabled = false;
    }
});

calculateButton.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const imc = weight / (height * height);
    imcResult.textContent = "IMC: " + imc.toFixed(2);
});

function updateMenuTable() {
    menu.forEach((items, dayIndex) => {
        const td = menuTable.querySelector(`[data-day="${dayIndex}"]`);
        td.innerHTML = "";
        const ul = document.createElement("ul");
        items.forEach((item, itemIndex) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.dataset.index = itemIndex;
            ul.appendChild(li);
        });
        td.appendChild(ul);
    });
}

function clearSelection() {
    if (selectedItem) {
        selectedItem.classList.remove("selected");
        selectedItem = null;
        menuItemInput.value = "";
        editButton.disabled = true;
        deleteButton.disabled = true;
    }
}

updateMenuTable();