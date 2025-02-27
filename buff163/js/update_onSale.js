/** Обновление информации продаваемых лотов */
function update_onSale(){
    let lots = document.querySelectorAll("li.my_selling")
    for (var lot of lots) {
        let price_cny = Number(lot.dataset.price)
        let resoult_cny = Math.floor(price_cny * 100 * 0.975) / 100
        let str = "¥ " + price_cny + " ("+resoult_cny+")"

        let new_strong = document.createElement("strong")
        new_strong.classList.add("tth_sale_price")
        new_strong.textContent = str
        lot.querySelector("p").appendChild(new_strong)
    }
}