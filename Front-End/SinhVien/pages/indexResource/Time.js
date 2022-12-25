
export default function isHappening(tbd, st) {
    let current = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    let tbdTime;
    let sotTime;
    if (tbd == 1) tbdTime = new moment("07:00", "HH:mm").format("HH:mm");
    if (tbd == 2) tbdTime = new moment("08:15", "HH:mm").format("HH:mm");
    if (tbd == 3) tbdTime = new moment("09:00", "HH:mm").format("HH:mm");
    if (tbd == 4) tbdTime = new moment("09:45", "HH:mm").format("HH:mm");
    if (tbd == 5) tbdTime = new moment("10:30", "HH:mm").format("HH:mm");
    if (tbd == 6) tbdTime = new moment("11:15", "HH:mm").format("HH:mm");
    if (tbd == 7) tbdTime = new moment("13:30", "HH:mm").format("HH:mm");
    if (tbd == 8) tbdTime = new moment("14:15", "HH:mm").format("HH:mm");
    if (tbd == 9) tbdTime = new moment("15:00", "HH:mm").format("HH:mm");

    let test = moment(tbdTime, "HH:mm");

    sotTime = moment(test).add(45 * st, "minutes").format("HH:mm");
    console.log(tbdTime, current, sotTime);
    return current >= tbdTime && current <= sotTime;
}






