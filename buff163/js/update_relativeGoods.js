/** Добавляет разницу в цене между качествами */
function relativeGoodsUpdate() {
    var tab = document.querySelector(".relative-goods")

    if (tab == null) {
        return
    } else {
        var all_tabs = document.querySelector(".relative-goods").querySelector("div").querySelectorAll('a')
        if (all_tabs.length <= 0){
            return
        }
        tab.style.flexDirection = "column"

        var all_tabs = document.querySelector(".relative-goods").querySelector("div").querySelectorAll('a')
        var activ_price_arr = document.querySelector(".relative-goods").querySelector("div").querySelector('.active').textContent.split(/\s+/)
        var activ_price = 0
        for (i = activ_price_arr.length - 1; i >= 0; i--) {
            if (activ_price_arr[i].length > 0) {
                activ_price = Number(activ_price_arr[i])
                break
            }
        }

        var div = document.createElement("div")
        div.classList.add("scope-btns")
        div.style.display = "flex"

        // Проверка на поиск по стикерам
        if (document.querySelector("#sticker_search_entry") != null) {
            document.querySelector("#sticker_search_entry").style.position = "absolute"
            document.querySelector("#sticker_search_entry").style.right = "20%"
        }

        for (let but of all_tabs) {
            var procent = document.createElement("div")
            procent.style.width = getComputedStyle(but, null).getPropertyValue("width")
            procent.classList.add("tth_rel_goods")
            
            if(!but.classList.contains("active")) {
            var arr = but.textContent.split(/\s+/)
            for (i = arr.length - 1; i >= 0; i--) {
                if (arr[i].length > 0) {
                    var result = ((Number(arr[i]) / activ_price - 1) * 100).toFixed(2)
                    if (result > 0) {
                        procent.innerText = "+" + result + "%\n" + "(x" + (Number(arr[i]) / activ_price).toFixed(2) + ")"
                    } else {
                        procent.innerText = result + "%\n" + "(-x" + (activ_price/ Number(arr[i]) ).toFixed(2) + ")"
                    }
                    break
                }
            }
        }

            div.appendChild(procent)
        }

        tab.appendChild(div)
    }
}