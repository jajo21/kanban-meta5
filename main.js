// import av alla moduels
import { logOut } from "./modules/logout.mjs";

const logOutBtn = document.querySelector(".logOutButton")

logOutBtn.addEventListener("click", function (){
    logOut()
});
