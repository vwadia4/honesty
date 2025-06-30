const chickType = document.getElementById('chickType');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const totalInput = document.getElementById('total');

// Auto calculate total
quantityInput.addEventListener('input', calculateTotal);
priceInput.addEventListener('input', calculateTotal);

function calculateTotal() {
    const quantity = parseFloat(quantityInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    totalInput.value = (quantity * price).toFixed(2);
}

function addPayment(event) {
    event.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const type = document.getElementById('type').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const total = parseFloat(document.getElementById('total').value);
    const paymentMode = document.getElementById('paymentMode').value;

    if (!name || isNaN(quantity) || isNaN(price) || isNaN(total)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const tableBody = document.getElementById('requestTable').querySelector('tbody');
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${type}</td>
        <td>${quantity}</td>
        <td>${price.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
        <td>${paymentMode}</td>
      `;

    updateGrandTotal();

    // Clear form
    document.getElementById('paymentForm').reset();
    totalInput.value = '';
}

function updateGrandTotal() {
    const tableBody = document.getElementById('requestTable').querySelector('tbody');
    let grandTotal = 0;

    for (let row of tableBody.rows) {
        const totalCell = row.cells[4];
        const total = parseFloat(totalCell.textContent);
        if (!isNaN(total)) {
            grandTotal += total;
        }
    }

    document.getElementById('grandTotalDisplay').innerText = `Grand Total: ${grandTotal.toFixed(2)}`;
}
    