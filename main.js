// import av alla moduels
import { logOut } from "./modules/logout.mjs";
import { dataFunction} from "./modules/localstorage.mjs";

const logOutBtn = document.querySelector(".logOutButton")

logOutBtn.addEventListener("click", function (){
    logOut()
});

dataFunction();