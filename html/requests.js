ocument.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chickenForm");
    const tableBody = document.querySelector("#requestTable tbody");

    let editingRow = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const farmerName = document.getElementById("farmerName").value.trim();
        const age = document.getElementById("age").value.trim();
        const farmerType = document.getElementById("farmerType").value;
        const quantity = document.getElementById("quantity").value;
        const category = document.getElementById("category").value;
        const chickType = document.getElementById("chickType").value;

        if (!farmerName || !age || !farmerType || !quantity || !category || !chickType) {
            document.getElementById("errorMsg").textContent = "Please fill all fields.";
            return;
        } else {
            document.getElementById("errorMsg").textContent = "";
        }

        const rowHTML = `
            <td>${farmerName}</td>
            <td>${age}</td>
            <td>${farmerType}</td>
            <td>${quantity}</td>
            <td>${category}</td>
            <td>${chickType}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `;

        if (editingRow) {
            editingRow.innerHTML = rowHTML;
            editingRow = null;
        } else {
            const row = document.createElement("tr");
            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        }

        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        const target = e.target;
        const row = target.closest("tr");

        if (target.classList.contains("delete-btn")) {
            row.remove();
        }

        if (target.classList.contains("edit-btn")) {
            const cells = row.querySelectorAll("td");

            document.getElementById("farmerName").value = cells[0].textContent;
            document.getElementById("age").value = cells[1].textContent;
            document.getElementById("farmerType").value = cells[2].textContent;
            document.getElementById("quantity").value = cells[3].textContent;
            document.getElementById("category").value = cells[4].textContent;
            document.getElementById("chickType").value = cells[5].textContent;

            editingRow = row;
        }
    });
});