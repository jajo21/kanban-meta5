export function addCard() {

    const addButton = document.getElementsByClassName("addButton");  
    for (let i = 0; i < addButton.length; i++) {
        addButton[i].addEventListener("click", () => {
            const textAreaDiv = document.createElement("div");
            addButton[i].before(textAreaDiv);
            const textArea = document.createElement("textarea");
            const saveButton = document.createElement("button");
            saveButton.className = "saveButton";
            saveButton.textContent = "Spara";
            saveButton.id = i;

            textAreaDiv.appendChild(textArea);
            textAreaDiv.appendChild(saveButton);

            saveButton.addEventListener("click", ()=> {
                textAreaDiv.id = getRandomInt(10000);
                textAreaDiv.innerText = textArea.value;
                textAreaDiv.className = "textDiv";
                saveButton.remove();
                textArea.remove();

                const dataArray = readData();

                if (i+1 === dataArray[i].id) {
                    dataArray[i].items.push({"id":getRandomInt(10000), "text":textArea.value});
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
}