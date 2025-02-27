/** Получить информацию о купленных скинах
    /market/sell_order/history?game=csgo
    /market/buy_order/history?game=csgo
*/
function getDataSkinsBuy() {
    let lot_history = document.querySelectorAll(".list_tb_csgo tr")
    var data = {}
    for (lot of lot_history) {
        var is_success = lot.querySelectorAll("td")[6].querySelector("p").classList.contains('c_Green');
        // Если операция завершена не успешно, то пропускать данную строку
        console.log("is_success", is_success)
        if(!is_success) continue;
        var name = lot.querySelectorAll("td")[2].querySelector("div").querySelector("a").innerText

        var float_str = lot.querySelectorAll("td")[2].querySelector("div").querySelector("p").innerText
        var separator = float_str.indexOf(":")
        var float_num = Number(float_str.substring(separator+1))
        
        var price_cny = lot.querySelectorAll("td")[3].querySelector("strong").innerText
        var buy_time = lot.querySelectorAll("td")[5].innerText
        var unix_time = Number(lot.querySelectorAll("td")[5].querySelector("span").dataset.ts)

        var classid = lot.querySelectorAll("td")[1].querySelector("div").dataset.classid
        var instanceid = lot.querySelectorAll("td")[1].querySelector("div").dataset.instanceid
        var assetid = lot.querySelectorAll("td")[1].querySelector("div").dataset.assetid

        console.log(name, float_str, price_cny, buy_time)
        console.log(classid, instanceid, assetid)
        lot.style.backgroundColor = "#D7E4D4"
        data[String(assetid)] = {
            "name": name,
            "last-show-unix": Date.now(),
            "classid": classid,
            "instanceid": instanceid,
            "seed": "",
            "float": float_num,
            "buy":{
                "market": "Buff163",
                "price": price_cny,
                "time-buy": buy_time,
                "time-unix": unix_time
            }
        }
    }

    console.log(data)
}