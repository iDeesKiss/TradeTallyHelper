function update_Inventory() {
    let slots = document.querySelectorAll("li.my_inventory")
    for (var slot of slots) {

        let price_cny = Number(JSON.parse(slot.getAttribute("data-item-info"))["price"])
        let resoult_cny = Math.floor(price_cny * 100 * 0.975) / 100
        let str = "¥ " + price_cny

        let new_strong = document.createElement("strong")
        new_strong.classList.add("tth_inv_price")
        new_strong.textContent = str
        slot.querySelector("p").appendChild(new_strong)
    }
}