let time = [[0, 0], [7, 0], [7, 45], [8, 30], [9, 0], [9, 45], [10, 30], [11, 15], [13, 0], [13, 45], [14, 30], [15, 0], [15, 45], [16, 30], [17, 15]]

export default function isHappening(tietBd, soTiet){
    let check = false
    var today = new Date()
    if(tietBd > 5) {
        tietBd += 1
    }
    // let hours = today.getHours()
    // var mins = today.getMinutes()
    let hours = 15
    let mins = 44
    let hoursStart = time[tietBd][0]
    let minsStart = time[tietBd][1]
    let hoursEnd = time[tietBd + soTiet][0]
    let minsEnd = time[tietBd + soTiet][1]
    console.log(hoursEnd, minsEnd, hoursStart, minsStart)
    if(hours == hoursEnd){
        if(mins <= minsEnd){
            check = true
        }
    } else if (hours < hoursEnd && hours >= hoursStart && mins >= minsStart){
        check = true
    }
    return check
}

console.log(isHappening(1, 4))
console.log(isHappening(5, 4))

