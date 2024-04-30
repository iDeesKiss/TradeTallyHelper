const BUFF163_REPEAT_GOODSUPDATE = 2000
window.onload = function () {
    if ((document.location.href).includes('https://buff.163.com/goods')) {
        var requestValue = 0;

        // Поиск лотов каждые 400 мс, пока не будут надейны лоты
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
                }
            }
        }, BUFF163_REPEAT_GOODSUPDATE)

    }

}