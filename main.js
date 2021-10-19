// import av alla moduels
import { logOut } from "./modules/logout.mjs";
import { addCard } from "./modules/add-card.mjs";
import { dragDrop } from "./modules/drag-drop.mjs";

const logOutBtn = document.querySelector(".logOutButton")

logOutBtn.addEventListener("click", function (){
    logOut()
});

addCard();
dragDrop();