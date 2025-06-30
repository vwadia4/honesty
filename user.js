/*// Function to add a user to the list
function addUser() {
    // Get the input values from the form
    const userName = document.getElementById('userInput').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const nin = document.getElementById('nin').value;
    const action = document.getElementById('action').value;

    // Check if all fields are filled out
    if (!userName || !gender || !dob || !nin || !action) {
        alert("Please fill out all fields.");
        return;
    }

    // Create a new list item for the user
    const userList = document.getElementById('userList');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
        <strong>${userName}</strong> - ${gender} - ${dob} - ${nin} - ${action}
        <button type="button" class="btn btn-warning btn-sm float-right ml-2" onclick="editUser(this)">Edit</button>
        <button type="button" class="btn btn-danger btn-sm float-right" onclick="deleteUser(this)">Delete</button>
    `;
    userList.appendChild(li);

    // Clear the form fields after adding the user
    document.getElementById('userForm').reset();
}

// Function to delete a user from the list (last added)
function deleteUser(button) {
    const userList = document.getElementById('userList');
    const listItem = button.parentElement;
    userList.removeChild(listItem);
}

// Function to edit a user from the list (prompt for new name)
function editUser(button) {
    const listItem = button.parentElement;
    const userName = listItem.querySelector('strong').textContent;

    // Prompt user to edit the name
    const newUserName = prompt("Edit User Name:", userName);

    // If user enters a new name, update the list item
    if (newUserName && newUserName !== userName) {
        listItem.querySelector('strong').textContent = newUserName;
    }
}



// Function to add a user to the list
function addUser() {
    // Get the input values from the form
    const userName = document.getElementById('userInput').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const nin = document.getElementById('nin').value;
    const action = document.getElementById('action').value;

    // Check if all fields are filled out
    if (!userName || !gender || !dob || !nin || !action) {
        alert("Please fill out all fields.");
        return;
    }

    // Create a new list item for the user
    const userList = document.getElementById('userList');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
        <strong>${userName}</strong> - ${gender} - ${dob} - ${nin} - ${action}
        <button type="button" class="btn btn-warning btn-sm float-right ml-2" onclick="editUser(this)">Edit</button>
        <button type="button" class="btn btn-danger btn-sm float-right" onclick="deleteUser(this)">Delete</button>
    `;
    userList.appendChild(li);

    // Clear the form fields after adding the user
    document.getElementById('userForm').reset();
}

// Function to add a user from the list (last added)
function AddTask(button) {
    const userList = document.getElementById('userList');
    const listItem = button.parentElement;
    userList.addChild(listItem);
}
// Function to delete a user from the list (last added)
function deleteUser(button) {
    const userList = document.getElementById('userList');
    const listItem = button.parentElement;
    userList.removeChild(listItem);
}

// Function to edit a user from the list (prompt for new name)
function editUser(button) {
    const listItem = button.parentElement;
    const userName = listItem.querySelector('strong').textContent;

    // Prompt user to edit the name
    const newUserName = prompt("Edit User Name:", userName);

    // If user enters a new name, update the list item
    if (newUserName && newUserName !== userName) {
        listItem.querySelector('strong').textContent = newUserName;
    }
}*/

function addTask() {
    const userName = document.getElementById('userInput').value.trim();
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const nin = document.getElementById('nin').value.trim();
    const action = document.getElementById('action').value;

    if (!userName || !gender || !dob || !nin || !action) {
        alert("Please fill in all user fields.");
        return;
    }

    const table = document.getElementById('requestTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.innerHTML = `
        <td>${userName}</td>
        <td>${gender}</td>
        <td>${nin}</td>
        <td>
            <button class="btn btn-sm btn-secondary me-1" onclick="editUser(this)">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Clear inputs
    document.getElementById('userInput').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('nin').value = '';
    document.getElementById('action').value = '';
}

function deleteRow(btn) {
    const row = btn.closest('tr');
    row.remove();
}

function editUser(btn) {
    const row = btn.closest('tr');
    const cells = row.querySelectorAll('td');
    const name = prompt("Edit Name:", cells[0].innerText);
    const gender = prompt("Edit Gender:", cells[1].innerText);
    const nin = prompt("Edit NIN:", cells[2].innerText);

    if (name && gender && nin) {
        cells[0].innerText = name;
        cells[1].innerText = gender;
        cells[2].innerText = nin;
    }
}

// FARMER SECTION

function addFarmer() {
    const name = document.getElementById('farmerName').value.trim();
    const gender = document.getElementById('farmerGender').value;
    const dob = document.getElementById('farmerDob').value;
    const nin = document.getElementById('farmerNin').value.trim();

    if (!name || !gender || !dob || !nin) {
        alert("Please fill in all farmer fields.");
        return;
    }

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${name} | ${gender} | ${dob} | ${nin}</span>
        <div>
            <button class="btn btn-sm btn-secondary me-1" onclick="editFarmer(this)">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="this.closest('li').remove()">Delete</button>
        </div>
    `;

    document.getElementById('farmerTaskList').appendChild(li);

    document.getElementById('farmerName').value = '';
    document.getElementById('farmerGender').value = '';
    document.getElementById('farmerDob').value = '';
    document.getElementById('farmerNin').value = '';
}

function editFarmer(btn) {
    const li = btn.closest('li');
    const text = li.querySelector('span').innerText;
    const [name, gender, dob, nin] = text.split(' | ');

    const newName = prompt("Edit Name:", name);
    const newGender = prompt("Edit Gender:", gender);
    const newDob = prompt("Edit DOB:", dob);
    const newNin = prompt("Edit NIN:", nin);

    if (newName && newGender && newDob && newNin) {
        li.querySelector('span').innerText = `${newName} | ${newGender} | ${newDob} | ${newNin}`;
    }
}