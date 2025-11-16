const table = document.getElementById("history");
const sm = document.getElementById("show_more");
const todayGame = JSON.parse(localStorage.getItem("daily_play"))
const targetDate = new Date("2025-09-17");

let today = new Date();
const diffTime = Math.abs(targetDate - today);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

console.log("Day no. ", diffDays);

let currentLength = 1;
let length = 21;
if (todayGame.date == today.toLocaleDateString()) {
    currentLength = 0;
    length = 20;
}
addToTable();
currentLength = length;


sm.addEventListener("click", c => {
    length += 20;
    addToTable();
    currentLength = length;
})

function addToTable() {
    for (let i = currentLength; i < length; i++) {
        if (i > diffDays)
            break;
        let theDate = new Date();
        const row = document.createElement("tr");
        const child1 = document.createElement("td");
        const child2 = document.createElement("td");
        child1.style.height = "80px";
        child2.style.height = "80px";

        fetch("data.json")
            .then(res => res.json())
            .then(data => {

                answer = data[diffDays - i];
                let ans = ""
                answer.forEach(element => {
                    ans += element;
                });
                theDate.setDate(theDate.getDate() - i);
                child1.innerText = theDate.toLocaleDateString();
                child2.innerText = ans;
            })

        row.appendChild(child1)
        row.appendChild(child2)
        table.appendChild(row);
    }
}