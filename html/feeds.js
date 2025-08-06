document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedsForm");
  const filterInput = document.getElementById("filterInput");
  const reportSelect = document.getElementById("feedsReport");
  const tableBody = document.querySelector("#requestTable tbody");

  // 1. Submit Form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      farmerName: form.farmerName.value,
      amountFeeds: form.amountFeeds.value,
      feedCost: form.feedCost.value,
      feedDate: form.feedDate.value,
      nextFeeds: form.nextFeeds.value
    };

    try {
      const res = await fetch("/feeds", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data)
      });

      if (res.ok) {
        alert("Feed record saved successfully.");
        window.location.reload(); // Reload to show the updated list
      } else {
        alert("Error submitting form.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed.");
    }
  });

  // 2. Export to CSV
  window.downloadCSV = function () {
    const rows = [["Farmer Name", "Feeds Amount", "Date", "Next Feed Date"]];
    const trElements = tableBody.querySelectorAll("tr");

    trElements.forEach(row => {
      const cells = row.querySelectorAll("td");
      const rowData = Array.from(cells).map(cell => cell.innerText);
      rows.push(rowData);
    });

    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feeds_records.csv";
    link.click();
  };

  // 3. Filter Records
  filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase();
    const filterType = reportSelect.value;

    Array.from(tableBody.rows).forEach(row => {
      let cellIndex;
      switch (filterType) {
        case "name": cellIndex = 0; break;
        case "amount": cellIndex = 1; break;
        case "date": cellIndex = 2; break;
        case "next": cellIndex = 3; break;
        default: cellIndex = -1;
      }

      if (cellIndex === -1) {
        row.style.display = "";
      } else {
        const cell = row.cells[cellIndex];
        const match = cell && cell.innerText.toLowerCase().includes(filterValue);
        row.style.display = match ? "" : "none";
      }
    });
  });
});
