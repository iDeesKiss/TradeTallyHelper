str = document.querySelectorAll("csfloat-item-row-wrapper")[0].shadowRoot.querySelector("div").innerText
str.split("\n")
str[0] = str[0].replace("Float: ", '')
str[1] = str[1].replace("Paint Seed: ", '')