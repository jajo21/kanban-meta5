export function addCard() {

    const addButton = document.getElementsByClassName("addButton");
    for (let i = 0; i < addButton.length; i++) {
        addButton[i].addEventListener("click", () => {
            const textAreaDiv = document.createElement("div");
            textAreaDiv.setAttribute("draggable", true);
            addButton[i].before(textAreaDiv);
            const textArea = document.createElement("textarea");
            const saveButton = document.createElement("button");
            saveButton.className = "saveButton";
            saveButton.textContent = "Spara";
            saveButton.id = i;

            textAreaDiv.appendChild(textArea);
            textAreaDiv.appendChild(saveButton);

            saveButton.addEventListener("click", () => {
                textAreaDiv.id = getRandomInt(10000);
                textAreaDiv.innerText = textArea.value;
                textAreaDiv.className = "textDiv";
                textAreaDiv.style.cursor = "pointer";

                dragAndDrop();

                saveButton.remove();
                textArea.remove();

                const dataArray = readData();

                if (i + 1 === dataArray[i].id) {
                    dataArray[i].items.push({ "id": getRandomInt(10000), "text": textArea.value });
                    save(dataArray);
                    console.log(dataArray);
                }
            });
        });
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /*  Här vi funktionen som sparar in datan som vi vill ha in i 
        localstorage. I dom funktioner som vi har något som ska till 
        localstorage så måste vi ha så att den sparas till en 
        variabel som heter "data". 
    */
    function save(data) {
        localStorage.setItem("kanbanData", JSON.stringify(data));
    }

    /*  Funktionen för att läsa ut datan som finns i localstorage 
        men det skapar arrays för alla kolumner även om det är tomt 
        i localstorage för att alltid ha tillgång till dom ids.
    */
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
        console.log("Drag Drop Scriptet körs");

        const columns = document.getElementsByClassName("column");

        const textDivs = document.getElementsByClassName("textDiv");

        for (const textDiv of textDivs) {
            if (textDiv.getAttribute('listener') !== 'true') {      // Kolla först om det redan finns event listener
                textDiv.addEventListener("dragstart", dragStart);
                textDiv.setAttribute('listener', 'true');
                textDiv.addEventListener("drop", dragDrop);
            }
        }

        // Loop Through Other Cards And Call Drag Events
        for (const column of columns) {
            column.addEventListener("dragover", dragOver);
            column.addEventListener("dragenter", dragEnter);
            column.addEventListener("dragleave", dragLeave);
            column.addEventListener("drop", dragDrop);
        }

        // Begin dragging box
        function dragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);
            const draggedElement = event.currentTarget;
            //   draggedElement.style.backgroundColor = 'pink';

            console.log("Drag börjar, objekt id: " + draggedElement.id);
        }

        function dragOver(e) {
            e.preventDefault();
            //    console.log("Over");
        }
        function dragEnter(e) {
            e.preventDefault();
            //    console.log("Enter");
        }
        function dragLeave(e) {
            e.preventDefault();
            //    console.log("Leave");
        }

        // Release box
        function dragDrop(event) {

            const id = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(id);
            console.log(id);
            const dropzone = event.target;

            if (dropzone.classList.contains("column")) {
                const lastChild = dropzone.children.length;
                dropzone.insertBefore(draggedElement, dropzone.children[lastChild - 1]);
            }

            if (dropzone.classList.contains('textDiv')) {               // If target is a 'box' itself then place the dropped item before it.
                const insertNode = dropzone.parentNode.insertBefore(draggedElement, dropzone);
            }

            event.dataTransfer.clearData();
        }

    }

}