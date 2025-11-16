const table = document.getElementById("statarray")
const rows = 6;
const cols = 2;
const nazvy = ["Longest Streak", "Streak", "Completed", "Total Wins", "Daily Wins", "Losses", "1. Try", "2. Try", "3. Try", "4. Try", "5. Try", "6. Try"];

const istatscreate = {
    completed: 0,
    wins: 0,
    losses: 0,
    on: [0, 0, 0, 0, 0, 0],
    dailyCompleted: 0,
    streak: 0,
    streakDate: 0,
    maxStreak: 0
};

let istats = Object.create(istatscreate);
if (localStorage.getItem("istats") != null)
    istats = JSON.parse(localStorage.getItem("istats"));

for (let i = 0; i < 6; i++) {
    if (istats.on[i] == undefined || istats.on[i] == null)
        istats.on[i] = 0;
}
if (istats.dailyCompleted == null)
    istats.dailyCompleted = 0;
if (istats.streak == null)
    istats.streak = 0;
if (istats.streakDate == null)
    istats.streakDate = 0;
if (istats.maxStreak == null)
    istats.maxStreak = 0;


if (istats.maxStreak < istats.streak)
    istats.maxStreak = istats.streak;

const headerrow = document.createElement("tr");
const header = document.createElement("th");
header.innerText = "Stats";
header.colSpan = "2";
header.style.fontSize = "35px";
headerrow.appendChild(header);
table.appendChild(headerrow);
const barvalues = [istats.on[0], istats.on[1], istats.on[2], istats.on[3], istats.on[4], istats.on[5]]
const values = [istats.maxStreak, istats.streak, istats.completed, istats.wins, istats.dailyCompleted, istats.losses]
for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    const child1 = document.createElement("td");
    const child2 = document.createElement("td");
    child2.style.width = "80px";

    child1.innerText = nazvy[i];
    child2.innerText = values[i];
    if (i == 1) {
        child2.style.fontWeight = "bold";
    }

    row.appendChild(child1)
    row.appendChild(child2)
    table.appendChild(row);
}


const barholder = document.getElementById("barholder");
const total = istats.wins;
console.log(total)

for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "guess-row";

    // Label (1–6)
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = i + 1;

    const number = document.createElement("span");
    number.className = "number";
    number.textContent = istats.on[i];

    // Bar container
    const bar = document.createElement("div");
    bar.className = "bar";

    // Fill element
    const fill = document.createElement("div");
    fill.className = "fill";

    // Set width relative to largest value

    const percent = (istats.on[i] / total) * 100;
    fill.style.width = percent + "%";

    // Assemble
    bar.appendChild(fill);
    row.appendChild(label);
    row.appendChild(bar);
    row.append(number);

    // Add to page
    barholder.appendChild(row);
}



