window.onload = function () {
    // Добавления кнопки появления меню
    document.querySelectorAll(".menu_but_h1").forEach(elem => {
        elem.addEventListener("click", () => {
            var element = document.querySelector('.center')
            let y = element.getBoundingClientRect().top;

            let h = document.body.getBoundingClientRect().height;

            if(y <= 0 ) {
                element.style.height = (h - 128) + "px"
            } else {
                element.style.height = (h - y) + "px"
            }
            
        })

        switch(elem.id){
            case "butmenu_setting":{
                elem.addEventListener("click", openMenu_setting)
            }
        }
        
    });
}