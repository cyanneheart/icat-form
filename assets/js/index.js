$(function () {
  var ip_address = prompt("Please enter your backend URL");
  var api_url = `${ip_address}/icat-backend/api.php`;
  console.log(api_url)
  var notyf = new Notyf();


  $('#application_form').submit(function (event) {
    event.preventDefault();

    // Get form data
    let passport_picture = $('#passport_picture').prop('files')[0];
    var formData = new FormData(this);

    formData.append('action', 'registerApplicant');
    formData.append('passport_picture', passport_picture)
    function appendDropdown(dropdown, key) {
      formData.append(key, dropdown.find('option:selected').text());
    }


    appendDropdown($('#add_birthplace_province'), 'birthplace_province');
    appendDropdown($('#add_birthplace_municipality'), 'birthplace_municipality');


    appendDropdown($('#barangay'), 'barangay');
    appendDropdown($('#province'), 'province');
    appendDropdown($('#region'), 'region');
    appendDropdown($('#city'), 'city');

    // Here, you can send the formData to your server using AJAX

    $.ajax({
      url: api_url,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
       if(data.success) {
        notyf.success(data.message)
        setTimeout(function(){
          location.reload()
        }, 2000)
       } else {
        notyf.error(data.message);
       }
      }
    });
  });

})
const yesRadio = document.getElementById('is_cultural_minority_group_yes');
const noRadio = document.getElementById('is_cultural_minority_group_no');
const minorityInput = document.getElementById('minority_group_name');

// Function to toggle input field state
function toggleInputState() {
  if (noRadio.checked) {
    minorityInput.disabled = true;
    minorityInput.value = ''; // Clear input value when "No" is selected
  } else {
    minorityInput.disabled = false;
  }
}

// Add event listeners for radio button change
yesRadio.addEventListener('change', toggleInputState);
noRadio.addEventListener('change', toggleInputState);

// Trigger the function initially to set the initial state
toggleInputState();

var currentYear = new Date().getFullYear();

var yearSelect = document.getElementById("birth_year");
for (var i = 1970; i <= currentYear; i++) {
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  yearSelect.appendChild(option);
}

var monthSelect = document.getElementById("birth_month");
var monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
for (var i = 0; i < monthNames.length; i++) {
  var option = document.createElement("option");
  option.text = monthNames[i];
  option.value = i + 1;
  monthSelect.appendChild(option);
}

var daySelect = document.getElementById("birth_day");
for (var i = 1; i <= 31; i++) {
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  daySelect.appendChild(option);
}


var currentDate = new Date();
yearSelect.value = currentDate.getFullYear();
monthSelect.value = currentDate.getMonth() + 1;
daySelect.value = currentDate.getDate();

function limitCheckboxSelection() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  var limit = 2;
  if (checkboxes.length > limit) {
    alert('You can only select up to 2 campuses.');
    this.checked = false; // Prevent checking this checkbox
  }
  // Disable all unchecked checkboxes if the limit is reached
  var allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < allCheckboxes.length; i++) {
    if (!allCheckboxes[i].checked && checkboxes.length >= limit) {
      allCheckboxes[i].disabled = true;
    } else {
      allCheckboxes[i].disabled = false;
    }
  }
}