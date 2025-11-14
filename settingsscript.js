const sb = document.getElementById("save");
const output = document.getElementById("output");
const rows = document.getElementById("rows");
const cols = document.getElementById("cols");

const ops = document.querySelectorAll(".operators input[type='checkbox']");

let settings = [];
if (localStorage.getItem("settings") != null)
    settings = JSON.parse(localStorage.getItem("settings"));

rows.value = settings.rows;
cols.value = settings.columns;

if (settings.allowedOperators) {
    ops.forEach(op => {
        op.checked = settings.allowedOperators.includes(op.value);
    });
}

sb.addEventListener("click", () => {
    console.log("update settings");

    const rowsValue = parseInt(document.getElementById("rows").value);
    const colsValue = parseInt(document.getElementById("cols").value);

    const operators = Array.from(
        document.querySelectorAll('.operators input[type="checkbox"]:checked')
    ).map(op => op.value);

    const settings = {
        rows: rowsValue,
        columns: colsValue,
        allowedOperators: operators
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    window.location.href = "index.html";
});
