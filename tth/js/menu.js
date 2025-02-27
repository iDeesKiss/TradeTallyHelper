/** Функция открытия меню skin data */
function openMenu_skinData(){
    var all_menu = this.querySelectorAll("*")
    all_menu.forEach(elem => {
        elem.style.display = "none"
    });


}

/** Функция открытия history */
function openMenu_histore(){

}

/** Функция открытия setting */
function openMenu_setting(){
    //Скрытие всех подменю
    var center = document.querySelector(".center")
    center.querySelectorAll("*").forEach(elem => {
        elem.style.display = "none"
    });
    
    if(this.id == "butmenu_setting"){
        if(center.style.display == "flex") {
            center.style.display = "none"
        } else {
            center.style.display = "flex"
        }
    }

}

function _create_podMenu_setting(){
    var menu = document.createElement("div")
    menu.classList.add("podmenu")

    var general = document.createElement("button")
    general.classList.add("menu_but_h2")
    general.id = "pm_setting_general"
    general.textContent = global_text["tth"]["setting"]["pm_b_general"][config["language"]]
}

/** Функция открытия skin data */
function openMenu_skinData(){

}