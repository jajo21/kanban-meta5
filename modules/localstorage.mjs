
export function dataFunction() {    
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

/*  Funktion som pushar in data i en array och sparar */
function pushData(data) {
    const dataArray = readData();

    for(let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id === 1) {
            dataArray[i].items.push({"id":getRandomInt(10000), "todo":data});
        } 
        else if (dataArray[i].id === 2) {
            dataArray[i].items.push({"id":getRandomInt(10000), "todo":data});
        }
        else if (dataArray[i].id === 3) {
            dataArray[i].items.push({"id":getRandomInt(10000), "todo":data});
        }
        else {
            dataArray[i].items.push({"id":getRandomInt(10000), "todo":data});
        }
    }

    console.log(dataArray);

    /* Funktion som genererar random tal */
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }


}
pushData("Hejhå");

}

