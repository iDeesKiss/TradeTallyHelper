/** Выдает цвет в зависимости от флота в определенном качестве */
function filt_getFloatColor(wear, float){
    // console.log("filt_getFloatColor:", wear, float)
    switch(wear){
        case 'Field-Tested':{
            // Если меньше 0.151 то фиолетовый
            if(float <= 0.151) { return "#8B40CD"; }
            else {
            // Если меньше 0.16 то зеленый
            if(float <= 0.16 && float >= 0.151) { return "#3DA365" }
            break;
            }
        }
        default:{
            return ""
        }
    }
    
}

function filt_getFloatWeight(wear, float){
    switch(wear){

    }
}

/** Выдает цвет в зависимости от значение ( + зеленый ) ( - красный ) */
function filt_getColorProfitSteam(procent){
    if(procent > 0) return "#28971E"
    else return "#BB1A1A"
}

function filt_getColorProfitBuff(procent){
    if(procent <= 5) return "#28971E"
    else
    if(procent <= 10) return "#E79F10"
    else return "#BB1A1A"
}