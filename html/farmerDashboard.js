let grandTotal = 0;
let editingRow = null;

function addPayment(event) {
    event.preventDefault();

    const name = document.getElementById('customerName').value;
    const type = document.getElementById('type').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const total = quantity * price;
    const mode = document.getElementById('paymentMode').value;

    if (!name || isNaN(quantity) || isNaN(price)) {
        alert("Please fill all fields correctly.");
        return;
    }

    if (editingRow) {
        // Subtract old total before updating
        const oldTotal = parseFloat(editingRow.cells[4].innerText);
        grandTotal -= oldTotal;

        // Update existing row
        editingRow.cells[0].innerText = name;
        editingRow.cells[1].innerText = type;
        editingRow.cells[2].innerText = quantity;
        editingRow.cells[3].innerText = price;
        editingRow.cells[4].innerText = total;
        editingRow.cells[5].innerText = mode;

        editingRow = null;
    } else {
        // Create new row
        const table = document.getElementById('requestTable').getElementsByTagName('tbody')[0];
        const row = table.insertRow();

        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = type;
        row.insertCell(2).innerText = quantity;
        row.insertCell(3).innerText = price;
        row.insertCell(4).innerText = total;
        row.insertCell(5).innerText = mode;

        const actionCell = row.insertCell(6);
        actionCell.innerHTML = `
            <button class="btn btn-sm btn-warning me-1" onclick="editRow(this)">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteRow(this)">Delete</button>
        `;
    }

    grandTotal += total;
    document.getElementById('grandTotalDisplay').innerText = `Grand Total: ${grandTotal}`;

    // Reset form
    document.getElementById('paymentForm').reset();
    document.getElementById('total').value = '';
}
