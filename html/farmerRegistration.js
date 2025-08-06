<script>
  const farmerTaskList = document.getElementById("farmerTaskList");

  let currentEditItem = null;

  function addFarmer() {
    // Get values
    const farmerName = document.getElementById("farmerName").value.trim();
    const farmerGender = document.getElementById("farmerGender").value;
    const farmerDob = document.getElementById("farmerDob").value;
    const contact = document.getElementById("contact").value.trim();
    const email = document.getElementById("email").value.trim();
    const farmerNin = document.getElementById("farmerNin").value.trim();
    const recommenderName = document.getElementById("recommenderName").value.trim();
    const recommenderNin = document.getElementById("recommenderNin").value.trim();

    // Basic validation
    if (!farmerName || !farmerGender || !contact) {
      alert("Please fill in Farmer Name, Gender, and Contact.");
      return;
    }

    // Create farmer summary
    const farmerInfo = `
      Name: ${farmerName} | Gender: ${farmerGender} | DOB: ${farmerDob} |
      Contact: ${contact} | Email: ${email} | NIN: ${farmerNin} |
      Recommender: ${recommenderName} | Recommender NIN: ${recommenderNin}
    `;

    if (currentEditItem) {
      currentEditItem.textContent = farmerInfo;
      currentEditItem = null;
    } else {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = farmerInfo;
      farmerTaskList.appendChild(li);
    }

    clearForm();
  }

  function clearForm() {
    document.getElementById("farmerName").value = "";
    document.getElementById("farmerGender").value = "";
    document.getElementById("farmerDob").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("email").value = "";
    document.getElementById("farmerNin").value = "";
    document.getElementById("recommenderName").value = "";
    document.getElementById("recommenderNin").value = "";
  }

  // Delete last farmer
  document.getElementById("deleteFarmerBtn").addEventListener("click", function () {
    const lastItem = farmerTaskList.lastElementChild;
    if (lastItem) {
      farmerTaskList.removeChild(lastItem);
    } else {
      alert("No farmer to delete.");
    }
  });

  // Edit last farmer
  document.getElementById("editFarmerBtn").addEventListener("click", function () {
    const lastItem = farmerTaskList.lastElementChild;
    if (lastItem) {
      currentEditItem = lastItem;
      farmerTaskList.removeChild(lastItem);
      alert("Now update the form and click 'Add Farmer' to apply changes.");
    } else {
      alert("No farmer to edit.");
    }
  });
</script>
