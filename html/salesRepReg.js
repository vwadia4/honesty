<script>
  let editIndex = null;

  function addTask() {
    const name = document.getElementById('salesRep').value;
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const nin = document.getElementById('nin').value;
    }
  if (!name || !gender || !dob || !nin) {
    alert("Please fill in all required fields.");
  return;
    }

  const tableBody = document.querySelector('#requestTable tbody');

  if (editIndex !== null) {
      // Edit mode - update existing row
    const row = tableBody.rows[editIndex];
  row.cells[0].innerText = name;
  row.cells[1].innerText = gender;
  row.cells[2].innerText = dob;
  row.cells[3].innerText = nin;

  editIndex = null;
    } else {
      // Add new row
      const newRow = tableBody.insertRow();

  newRow.insertCell(0).innerText = name;
  newRow.insertCell(1).innerText = gender;
  newRow.insertCell(2).innerText = dob;
  newRow.insertCell(3).innerText = nin;

  // Add Edit and Delete buttons
  const actionCell = newRow.insertCell(4);
  actionCell.innerHTML = `
  <button class="btn btn-sm btn-warning" onclick="editTask(this)">Edit</button>
  <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
  `;
    }

  // Clear form
  document.getElementById('salesRep').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('nin').value = '';
    }

  function editTask(button) {
    const row = button.parentElement.parentElement;
  editIndex = row.rowIndex - 1;

  document.getElementById('salesRep').value = row.cells[0].innerText;
  document.getElementById('gender').value = row.cells[1].innerText;
  document.getElementById('dob').value = row.cells[2].innerText;
  document.getElementById('nin').value = row.cells[3].innerText;
  }

  function deleteTask(button) {
    const row = button.parentElement.parentElement;
  row.remove();
  if (editIndex !== null) editIndex = null; // Reset edit index if editing
  },

  // Optional: prevent form submit if user presses Enter
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
  });
</script>
