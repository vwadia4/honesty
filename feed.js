
const form = document.getElementById("feedsForm");
const tableBody = document.querySelector("#requestTable tbody");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("farmerName").value;
    const amount = document.getElementById("amountFeeds").value;
    const date = document.getElementById("feedDate").value;
    const nextDate = document.getElementById("nextFeeds").value;

    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td>${nextDate}</td>
      `;

    form.reset();
});

// Filtering logic
document.getElementById("filterInput").addEventListener("input", function () {
    const filterType = document.getElementById("feedsReport").value;
    const filterValue = this.value.toLowerCase();

    Array.from(tableBody.rows).forEach(row => {
        const cells = row.getElementsByTagName("td");
        let match = true;

        if (filterType !== "all") {
            const index = {
                name: 0,
                amount: 1,
                date: 2,
                next: 3
            }[filterType];
            match = cells[index].textContent.toLowerCase().includes(filterValue);
        } else {
            match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterValue));
        }

        row.style.display = match ? "" : "none";
    });
});

// CSV Export
function downloadCSV() {
    let csv = "Farmer Name,Feeds Amount,Date,Next Feed Date\n";
    Array.from(tableBody.rows).forEach(row => {
        const cols = row.querySelectorAll("td");
        const rowText = Array.from(cols).map(cell => `"${cell.innerText}"`).join(",");
        csv += rowText + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feeds_report.csv";
    a.click();
    URL.revokeObjectURL(url);
}