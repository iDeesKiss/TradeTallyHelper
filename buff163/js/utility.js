/** Обрезает "¥ 5.5" -> "5.5"*/
function get_cny(str){
    const search = "¥ "
    return str.slice(search.length)
}

/** Обрезает "Float: 0.029794421046972275" -> "0.029794421046972275"*/
function get_float(str){
    const search = "Float: "
    return str.slice(search.length)
}
/**(Number) Обрезает "(₽ 59.05)" -> "59.05"*/
function get_lotHidePrice(str){
    const search = "("+get_activeCurrency()+" "
    return Number(str.slice(search.length,str.length-1))
}

//------------------------------------------------------------------
// Выдает постоянные данные на странице

/**(Number) Выдает цену в стиме "₽ 13.92($ 0.23)" -> "13.92"*/
function get_steamPrice(){
    let str_price = document.querySelector(".detail-summ .f_Strong").textContent
    return Number(str_price.slice(get_activeCurrency().length+1, str_price.indexOf("(")))
}

/**(str) Выдает активную валюту "₽ 13.92($ 0.23)" -> "₽"*/
function get_activeCurrency(){
    let str_currency = document.querySelector(".detail-summ .f_Strong").textContent
    return String(str_currency.slice(0, str_currency.indexOf(" ")))
}

/** Выдает цену активного износа на buff ' Minimal Wear ₽ 2682.45 ' -> "2682.45"*/
function get_buffWearPrice(){
    let str_wearCurrency = document.querySelector("a.active").textContent
    var str_currency = get_activeCurrency()
    return str_wearCurrency.slice(str_wearCurrency.indexOf(str_currency)+str_currency.length).trim()
}

/** Выдает цену 1 лота '(₽ 73.63)' -> "73.63"*/
function get_buff1LotPrice(){
    return get_lotHidePrice(document.querySelector("tr.selling").querySelector(".hide-cny").textContent)
}

/** Выдает качество износа ' Minimal Wear ₽ 2682.45 ' -> "Minimal Wear"*/
function get_lot_wear(){
    let str_wear = document.querySelector("a.active").textContent
    var str_currency = get_activeCurrency()
    return str_wear.slice(1, str_wear.indexOf(str_currency)-str_currency.length)
}