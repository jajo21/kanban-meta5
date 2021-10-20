export function addCard() {

    /*  Funktion som skriver ut sparade kort om användaren inte har tagit bort dessa. */
    function readCard() {
        const data = localStorage.getItem("kanbanData");
        if (!data) {
            addCardElements();
        }
        else {
            const dataArray = readData();
            for (let i = 0; i < dataArray.length; i++) {
                for (let j = 0; j < dataArray[i].items.length; j++) {
                    if (dataArray[i].items[j] != null) {
                        const addButton = document.getElementsByClassName("addButton");
                        const textAreaDiv = document.createElement("div");
                        addButton[i].before(textAreaDiv);
                        textAreaDiv.id = dataArray[i].items[j].id;
                        textAreaDiv.className = "textDiv";
                        const textContentDiv = document.createElement("p");
                        textContentDiv.classList.add("label");
                        textContentDiv.innerText = dataArray[i].items[j].text;
                        textAreaDiv.appendChild(textContentDiv);
                        addEditButtons(textAreaDiv, textContentDiv, textAreaDiv.id, i);
                        textAreaDiv.setAttribute("draggable", true);
                        textAreaDiv.style.cursor = "pointer";
                        dragAndDrop();
                    }
                }
            }
            addCardElements();
        }
    }
    readCard();

    /*  Funktion för skapandet av alla element som behövs för att skapa nya kort. */
    function addCardElements() {
        const addButton = document.getElementsByClassName("addButton");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].addEventListener("click", () => {
                const textAreaDiv = document.createElement("div");
                textAreaDiv.setAttribute("draggable", true);
                addButton[i].before(textAreaDiv);
                const textArea = document.createElement("textarea");
                const saveButton = document.createElement("button");
                saveButton.className = "saveButton";
                saveButton.textContent = "Save";
                saveButton.id = i;
                textAreaDiv.appendChild(textArea);
                textAreaDiv.appendChild(saveButton);

                saveButton.addEventListener("click", () => {
                    textAreaDiv.id = getRandomInt(10000);
                    const textContentDiv = document.createElement("p");
                    textContentDiv.innerText = textArea.value;
                    textContentDiv.classList.add("label");
                    textAreaDiv.className = "textDiv";
                    textAreaDiv.style.cursor = "pointer";

                    dragAndDrop();

                    textAreaDiv.appendChild(textContentDiv)
                    textAreaDiv.className = "textDiv";
                    saveButton.remove();
                    textArea.remove();
                    addEditButtons(textAreaDiv, textContentDiv, textAreaDiv.id, i);
                    const dataArray = readData();

                    if (i + 1 === dataArray[i].id) {
                        dataArray[i].items.push({ "id": textAreaDiv.id, "text": textArea.value });
                        save(dataArray);
                    }
                });
            });
        }
    }
    /*  Funktion som skapar knappar som kan redigera och radera sparade kort. */
    function addEditButtons(divArea, divText, divId, i) {
        const removeButton = document.createElement("button");
        const editButton = document.createElement("button");
        divArea.appendChild(removeButton);
        divArea.appendChild(editButton);
        removeButton.innerText = "x";
        editButton.innerText = "edit";
        removeButton.addEventListener("click", () => {

            const dataArray = readData();
            const findArray = dataArray[i].items.find(a => a.id === divId);
            const place = dataArray[i].items.indexOf(findArray);
            dataArray[i].items.splice(place, 1);
            const dataString = JSON.stringify(dataArray);
            localStorage.setItem("kanbanData", dataString);
            divArea.remove();

        });
        editButton.addEventListener("click", () => {
            const textArea = document.createElement("textarea");
            const textValue = divText.innerText;
            textArea.innerText = textValue;
            divArea.appendChild(textArea);
            editButton.remove();
            removeButton.remove();
            divText.innerText = "";
            const newSaveButton = document.createElement("button");
            newSaveButton.innerText = "Save";
            divArea.appendChild(newSaveButton);

            newSaveButton.addEventListener("click", () => {
                divText.innerText = textArea.value;
                textArea.remove();
                newSaveButton.remove();
                addEditButtons(divArea, divText, divId, i);

                const dataArray = readData();
                const findArray = dataArray[i].items.find(a => a.id === divId);
                findArray.text = textArea.value;
                const dataString = JSON.stringify(dataArray);
                localStorage.setItem("kanbanData", dataString);
            })

        });
    }
    /*  Funktion för att skapa radom numer till ids */
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /*  Funktion för att spara vald data i localStorage */
    function save(data) {
        localStorage.setItem("kanbanData", JSON.stringify(data));
    }

    /*  Funktion för att läsa och returnera data från localStorage samt skapa en array
        för alla Kolumner om localStorage är tomt. */
    function readData() {
        const json = localStorage.getItem("kanbanData");

        if (!json) {
            return [
                {
                    id: 1,
                    items: []
                },
                {
                    id: 2,
                    items: []
                },
                {
                    id: 3,
                    items: []
                },
                {
                    id: 4,
                    items: []
                },
            ]
        }
        return JSON.parse(json);
    }

    function dragAndDrop() {
        /* Lägg till nödvändiga eventListerners i kolumner och textDivar. */
        const columns = document.getElementsByClassName("column");
        const textDivs = document.getElementsByClassName("textDiv");

        for (const textDiv of textDivs) {
            if (textDiv.getAttribute('listener') !== 'true') {      /* Kolla först om det redan finns eventListenernes */
                textDiv.addEventListener("dragstart", dragStart);
                textDiv.setAttribute('listener', 'true');
                textDiv.addEventListener("drop", dragDrop);
            }
        }

        for (const column of columns) {
            column.addEventListener("dragover", dragOver);
            column.addEventListener("dragenter", dragEnter);
            column.addEventListener("dragleave", dragLeave);
            column.addEventListener("drop", dragDrop);
        }

        /* Nu drar vi! */
        function dragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);
            const draggedElement = event.currentTarget;
        }

        /* Vi vill inte ha standard-beteendet när man drar element. */
        function dragOver(e) {
            e.preventDefault();
        }
        function dragEnter(e) {
            e.preventDefault();
        }
        function dragLeave(e) {
            e.preventDefault();
        }

        /* Släpp elementet in i en kolumn. */
        function dragDrop(event) {
            const id = event.dataTransfer.getData("text");            /* Hämta ID attributen ifrån elementet vi släpar på. */
            const draggedElement = document.getElementById(id);
            const dropzone = event.target;                           /* Även ID på våran dropzone, alltså objektet som vi ska parenta draggedElement under. */

            /*  Om dropzone är en column så lägg den näst sist i 
                children-listan. Allra sist i column ska nämligen vara addButton.*/
            if (dropzone.classList.contains("column")) {
                const lastChild = dropzone.children.length;
                dropzone.insertBefore(draggedElement, dropzone.children[lastChild - 1]);
            }

            /*  Är dropzone en textDiv så placera elementet innan den.*/
            if (dropzone.classList.contains('textDiv')) {
                const column = dropzone.parentNode;
                const insertNode = column.insertBefore(draggedElement, dropzone);
            }

            /*  I det fall dropzone är en paragraf så leta upp dess textDiv och kolumn. 
                Lägg sedan elementet före den textDiven.*/
            if (dropzone.classList.contains('label')) {
                const textDiv = dropzone.parentNode;
                const column = textDiv.parentNode;
                const insertNode = column.insertBefore(draggedElement, textDiv);
            }
            event.dataTransfer.clearData();
        }
    }
}