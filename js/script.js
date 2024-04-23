const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

document.addEventListener("DOMContentLoaded", function () {
    loadToDoList();
});

item.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addToDo(event.target.value);
        event.target.value = "";
        saveToDoList();
    }
});

const addToDo = (itemText) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        ${itemText}
        <i class="fas fa-times"></i>
    `;

    listItem.addEventListener("click", function () {
        this.classList.toggle("done");
        saveToDoList();
    });

    listItem.querySelector("i").addEventListener("click", function () {
        listItem.remove();
        saveToDoList();
    });

    toDoBox.appendChild(listItem);
    saveToDoList();
};

const saveToDoList = () => {
    const toDoItems = Array.from(toDoBox.children).map((item) => ({
        text: item.innerText.trim(),
        done: item.classList.contains("done"),
    }));
    localStorage.setItem("toDoList", JSON.stringify(toDoItems));
};

const loadToDoList = () => {
    const savedToDoList = localStorage.getItem("toDoList");

    if (savedToDoList) {
        const parsedToDoList = JSON.parse(savedToDoList);

        parsedToDoList.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.text}
                <i class="fas fa-times"></i>
            `;
            if (item.done) {
                listItem.classList.add("done");
            }

            listItem.addEventListener("click", function () {
                this.classList.toggle("done");
                saveToDoList();
            });

            listItem.querySelector("i").addEventListener("click", function () {
                listItem.remove();
                saveToDoList();
            });

            toDoBox.appendChild(listItem);
        });
    }
};
