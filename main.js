// import av alla moduels
import { logOut } from "./modules/logout.mjs";
import { addCard } from "./modules/add-card.mjs";

const logOutBtn = document.querySelector(".logOutButton")

logOutBtn.addEventListener("click", function (){
    logOut()
});

addCard();