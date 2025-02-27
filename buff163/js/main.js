const BUFF163_REPEAT_GOODSUPDATE = 2000
const BUFF163_REPEAT_INVUPDATE = 3000

window.onload = function () {
    if ((document.location.href).includes('https://buff.163.com/goods')) {
        relativeGoodsUpdate()
        var requestValue = 0;

        // Поиск лотов каждые 400 мс, пока не будут надены лоты
        let parsing = setInterval(() => {
            if (document.querySelectorAll("tr.selling").length > 0) {
                // Лоты найдены
                clearInterval(parsing)
            }
            if (requestValue >= 25) {
                // Лоты не найдены
                clearInterval(parsing)
                console.log("lots not found")
            }
            requestValue++
        }, 400)

        var lots_update = setInterval(() => {
            if (document.querySelectorAll("tr.selling").length > 0) {
                lots = document.querySelectorAll("tr.selling").length
                if (lots > document.querySelectorAll("tr.tth_goods_lot").length && lots > 0) {
                    // Обработка лотов
                    goods_lots()
                    create_but_link()
                }
            }
        }, BUFF163_REPEAT_GOODSUPDATE)

    } else if ((document.location.href).includes('https://buff.163.com/market/sell_order/on_sale')) {
        update_onSale()

    } else if ((document.location.href).includes('https://buff.163.com/market/steam_inventory')) {
        var requestValue = 0;

        let parsing = setInterval(() => {
            if (document.querySelectorAll("li.my_inventory").length > 0) {
                // Лоты найдены
                clearInterval(parsing)
            }
            if (requestValue >= 25) {
                // Лоты не найдены
                clearInterval(parsing)
                console.log("lots not found")
            }
            requestValue++
        }, 400)

        var lots_update = setInterval(() => {
            if (document.querySelectorAll("li.my_inventory").length > 0) {
                lots = document.querySelectorAll("li.my_inventory").length
                if (lots > document.querySelectorAll("strong.tth_inv_price").length && lots > 0) {
                    // Обработка лотов
                    update_Inventory()
                }
            }
        }, BUFF163_REPEAT_INVUPDATE)
        

    }

}