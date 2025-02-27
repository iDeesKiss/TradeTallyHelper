/** Функция добавления кнопки "Поделиться лотом" */
function create_but_link() {
    let lots = document.querySelectorAll("tr.selling")

    for (var lot of lots) {
        let a = document.createElement("a")
        a.classList.add("tth_but_link", "ctag")
        a.title = global_text["update_goods"]["but_link-title"][config["language"]]
        let b = document.createElement("b")
        b.style.margin = "0px -2px"
        let i = document.createElement("i")
        i.classList.add("icon", "tth_but_link__img")
        b.appendChild(i)
        a.appendChild(b)
        a.addEventListener("click", createURLLot)
        const children = Array.from(lot.querySelector(".csgo_value").children);
        lot.querySelector(".csgo_value").insertBefore(a, children[6])
        // console.log(lot.children)
        // console.log(lot.querySelector(".csgo_value").children)
    }
}

/** Создание ссылки на лот */
function createURLLot() {
    lot = this.closest(':not(.tth_but_link)').closest(':not(.csgo_value)').closest(':not(.name-cont)').closest(':not(.t_Left)')
    let data = JSON.parse(lot.getAttribute("data-asset-info"))
    var min_float = parseFloat(data["paintwear"].substring(0, 6));
    var max_float = Math.ceil((min_float + 0.0001) * 10000) / 10000;
    var pattern = data['info']['paintseed']
    // console.log(min_float, max_float, pattern)
    // console.log(typeof(min_float), typeof(pattern))
    if(pattern === undefined){
        console.log("Создать ссылку данного предмета не возможно")
        return
    }
    var url = document.location.href
    url = update_link_paintseed(url, pattern)
    url = update_link_float(url, min_float, max_float)

    const text = url;
    const textArea = document.createElement("textarea");
    // Устанавливаем значение для textarea и добавляем его на страницу
    textArea.value = text;
    document.body.appendChild(textArea);
    // Выбираем текст в textarea и копируем его в буфер обмена
    textArea.select();
    document.execCommand("copy");
    // Удаляем textarea со страницы
    document.body.removeChild(textArea);

    console.log(url)
}

/** Обновление paintseed в ссылке */
function update_link_paintseed(url, pattern) {
    var search_str = 'paintseed='
    const paintseed = url.indexOf(search_str);

    if (paintseed === -1) {
        // console.log("Строка", search_str, "не найдена")
        // Строка "paintseed==" не найдена, добавляем ее в конец строки
        url = url + "&" + search_str + pattern;
    } else {
        var ampersandIndex = url.indexOf('&', paintseed);
        if (ampersandIndex === -1) {
            // console.log("Строка", search_str, "найдена, '&' нет")
            // Знака "&" после "min_paintwear=" нет, заменяем значение до конца строки
            url = url.substring(0, paintseed + search_str.length) + pattern + "&";
        } else {
            // console.log("Строка", search_str, "найдена, '&' найден")
            // console.log("paintseed", paintseed, "ampersandIndex", ampersandIndex)
            // Знак "&" после "min_paintwear=" найден, заменяем значение между ними
            url = url.substring(0, paintseed + search_str.length) + pattern + url.substring(ampersandIndex);
        }
    }
    return url
}

/** Обновление paintwear в ссылке */
function update_link_float(url, min_float, max_float) {
    // обновление min_paintwear
    let search_str = 'min_paintwear='
    const min_paintwear = url.indexOf(search_str);
    if (min_paintwear === -1) {
        // console.log("Строка", search_str, "не найдена")
        // Строка "min_paintwear=" не найдена, добавляем ее в конец строки
        url = url + "&" + search_str + min_float;
    } else {
        var ampersandIndex = url.indexOf('&', min_paintwear);
        if (ampersandIndex === -1) {
            // console.log("Строка", search_str, "найдена, '&' нет")
            // Знака "&" после "min_paintwear=" нет, заменяем значение до конца строки
            url = url.substring(0, min_paintwear + search_str.length) + min_float + "&";
        } else {
            // console.log("Строка", search_str, "найдена, '&' найден")
            // Знак "&" после "min_paintwear=" найден, заменяем значение между ними
            url = url.substring(0, min_paintwear + search_str.length) + min_float + url.substring(ampersandIndex);
        }
    }

    // обновление min_paintwear
    search_str = 'max_paintwear='
    const max_paintwear = url.indexOf(search_str);
    if (max_paintwear === -1) {
        // console.log("Строка", search_str, "не найдена")
        // Строка "max_paintwear=" не найдена, добавляем ее в конец строки
        url = url + "&" + search_str + max_float;
    } else {
        var ampersandIndex = url.indexOf('&', max_paintwear);
        if (ampersandIndex === -1) {
            // console.log("Строка", search_str, "найдена, '&' нет")
            // Знака "&" после "max_paintwear=" нет, заменяем значение до конца строки
            url = url.substring(0, max_paintwear + search_str.length) + max_float + "&";
        } else {
            // console.log("Строка", search_str, "найдена, '&' найден")
            // Знак "&" после "max_paintwear=" найден, заменяем значение между ними
            url = url.substring(0, max_paintwear + search_str.length) + max_float + url.substring(ampersandIndex);
        }
    }

    const page_num = url.indexOf('page_num=');
    if (page_num === -1) {

    } else {
        var ampersandIndex = url.indexOf('&', page_num);
        if (ampersandIndex === -1) {
            // Знака "&" после "page_num=" нет, удаляем "page_num=" и все что после него
            url = url.substring(0, page_num-1);
        } else {
            // Знак "&" после "page_num=" найден, удаляем "page_num=" и все между ними
            url = url.substring(0, page_num-1) + url.substring(ampersandIndex);
        }
    }
    // Удалить последний &
  if (url.charAt(url.length - 1) === '&') {
     url.slice(0, -1);
  }

  // Проверка на #tab=selling
  if (url.indexOf('#tab=selling') === -1) {
    const ampersandIndex = url.indexOf('&');
    if (ampersandIndex === -1) {
        url = url + '&#tab=selling';
    } else {
        url = url.substring(0, ampersandIndex) + '#tab=selling' + url.substring(ampersandIndex);
    }
  } 
    return url
}