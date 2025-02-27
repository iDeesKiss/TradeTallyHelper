/** Обновляет лоты */
function goods_lots() {
    let lots = document.querySelectorAll("tr.selling")

    try {
        var isFloat = get_isFloat(lots[0])
    } catch (err) {
        console.log("Float not found")
        isFloat = false
    }

    for (var lot of lots) {
        if (isFloat) {
            try {
                let seed = addPaintseed(lot)
                lot.querySelector(".csgo_value").appendChild(seed)
            } catch {
                console.log("Error lot.querySelector('.csgo_value').appendChild(seed)")
                console.log(lot)
            }
        }

        buyBuffRub = get_lotHidePrice(lot.querySelector(".hide-cny").textContent)
        try {
            var min_price = get_buffWearPrice()
            // Добавляет разницу цены с баффом
            lot.querySelector(".hide-cny").closest(':not(.hide-cny)').appendChild(addBuffCompare(buyBuffRub))
        } catch { }

        //Добавление разницу цены при продаже в стим span под цену в рублях
        // buyBuffRub = get_lotHidePrice(lot.querySelector(".hide-cny").textContent)
        lot.querySelector(".hide-cny").closest(':not(.hide-cny)').appendChild(addSteamProfit(buyBuffRub))

        // Добавляет разницу цены со стимом
        lot.querySelector(".hide-cny").closest(':not(.hide-cny)').appendChild(addSteamCompare(buyBuffRub))
        //
        lot_update(lot)
    }

    
}


/** Есть ли флот у предмета
 * @returns bool
*/
function get_isFloat(lot) {
    try {
        let str_float = document.querySelector(".wear-value").textContent
        return true
    } catch {
        return false
    }
}

/** Возвращает div с Paintseed */
function addPaintseed(data) {
    let str = "Pattern: "

    var paintseed = data.getAttribute("data-asset-info")
    var paintseed = JSON.parse(paintseed)['info']['paintseed']

    str = str + paintseed

    if (paintseed == undefined) {
        str = ""
    }

    // Создание div
    var paint_count = document.createElement('div')
    paint_count.classList.add("f_14px")
    paint_count.style.fontWeight = "400"
    paint_count.style.padding = "2px 0px"
    paint_count.style.color = "#959595"
    paint_count.textContent = str

    return paint_count;
}

const STEAM_COMISSION = 0.8696
/** Возвращает span с результатом профита */
function addSteamProfit(buyBuffRub) {
    var str = ">S "
    var resoult_procent = (((get_steamPrice() * STEAM_COMISSION) / buyBuffRub) * 100 - 100).toFixed(2)
    // S 34.42 ₽ (1.22%) - green
    // S -34.42 ₽ (-1.22%) - red

    str = str
        + ((get_steamPrice() * STEAM_COMISSION) - buyBuffRub).toFixed(2)
        + " "+get_activeCurrency()+" (" + resoult_procent
        + "%)"

    // Создание span
    var steam_count = document.createElement('p')
    steam_count.classList.add("f_12px", "CountSteamProfig")
    steam_count.style.color = filt_getColorProfitSteam(resoult_procent)
    steam_count.style.fontWeight = "600"
    steam_count.style.fontSize = "12px"
    steam_count.textContent = str

    return steam_count;
}

/** Возвращает span с различием со стимом */
function addSteamCompare(buyBuffRub) {
    var str = "=S "
    
    var resoult_procent = ((buyBuffRub / get_steamPrice() - 1 ) * 100).toFixed(2)
    // S 34.42 ₽ (1.22%) - green
    // S -34.42 ₽ (-1.22%) - red

    str = str
        + (buyBuffRub - get_steamPrice()).toFixed(2)
        + " "+get_activeCurrency()+" (" + resoult_procent
        + "%)"

    // Создание span
    var steam_count = document.createElement('p')
    steam_count.classList.add("f_12px", "CountSteamCompare")
    steam_count.style.color = filt_getColorProfitSteam(resoult_procent*(-1))
    steam_count.style.fontSize = "12px"
    steam_count.textContent = str

    return steam_count;
}

/** Возвращает span с различием с баффом */
function addBuffCompare(buyBuffRub) {
    var str = "=B "
    // try {
        var min_price = get_buffWearPrice()
        var resoult_procent = ((buyBuffRub / min_price - 1) * 100).toFixed(2)
        
    // } catch {
    //     var min_price = get_buff1LotPrice()
    //     var resoult_procent = ((buyBuffRub / min_price - 1) * 100).toFixed(2)
    // }
    
    // S 34.42 ₽ (1.22%) - green
    // S -34.42 ₽ (-1.22%) - red

    str = str
        + (buyBuffRub - min_price ).toFixed(2)
        + " "+get_activeCurrency()+" (" + resoult_procent
        + "%)"

    // Создание span
    var steam_count = document.createElement('p')
    steam_count.classList.add("f_12px", "CountBuffCompare")
    steam_count.style.color = filt_getColorProfitBuff(resoult_procent)
    steam_count.style.fontSize = "12px"
    steam_count.textContent = str

    return steam_count;
}

/** Изменение строки лота */
function lot_update(lot){
    lot.classList.add("tth_goods_lot")

    //Сокращение кнопок лота
    let buts = lot.querySelectorAll(".t_Left div div .ctag")
    for (let but of buts) {
        but.title = but.textContent
        const endIndex = but.innerHTML.indexOf('</b>');
        but.innerHTML = but.innerHTML.substring(0, endIndex + '</b>'.length);
        but.querySelector("b").style.margin = "0px -2px"
    }
}