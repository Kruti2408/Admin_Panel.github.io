/*
const searchFunc = () => {
    let filter = document.getElementById('search-box').value.toLocaleUpperCase();

    let myTable = document.getElementById('table-data');

    let tr = myTable.getElementsByTagName('tr');

    for(var i = 0; i < tr.length; i++) {
        let td = tr[i].querySelectorAll('.column2,.column3,.column4');

        if(td) {
            let textValue = td.textContent || td.innerHTML;

            if(textValue.toLocaleUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

*/


// URL to fetch data from

var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


  // prevent cors error due to http request

// Function to create table rows and cells
function createTable(data) {
  // Access the table data placeholder
  const tableDataPlaceholder = document.getElementById('table-data');

  // Create a table element
  const table = document.createElement('table');

  // Create a tbody element
  const tbody = document.createElement('tbody');

  // Iterate over the data and create table rows and cells
  data.forEach(item => {
    const row = document.createElement('tr');
    row.classList.add('data-row');
    row.setAttribute('data-user', JSON.stringify(item)); // Set the data-user attribute

    const fields = ['id', 'firstName', 'lastName', 'email', 'phone'];
    fields.forEach(field => {
      const cell = document.createElement('td');
      cell.classList.add(`column${fields.indexOf(field) + 1}`);
      cell.textContent = item[field];
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableDataPlaceholder.innerHTML = ''; // Clear the existing content
  tableDataPlaceholder.appendChild(table); // Append the table to the placeholder

  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('input', function (event) {
    const searchValue = event.target.value.toLowerCase();
    filterTableRows(searchValue);
  });

  // Add click event listener to each row
  const rows = table.getElementsByClassName('data-row');
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', () => {
      const userData = JSON.parse(rows[i].getAttribute('data-user'));
      document.getElementById('info-content').style.display = 'block';
      showUserDetails(userData);

      // Remove active class from all rows
      const tableRows = table.getElementsByClassName('data-row');
      for (let j = 0; j < tableRows.length; j++) {
        tableRows[j].classList.remove('active');
      }

      // Add active class to the clicked row
      rows[i].classList.add('active');
    });
  }
}

// Function to filter table rows based on search input
function filterTableRows(searchValue) {
  const tableRows = document.querySelectorAll('#table-data .data-row');
  tableRows.forEach(row => {
    const firstName = row.querySelector('.column2').textContent.toLowerCase();
    if (firstName.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Function to update details panel with user information
function showUserDetails(user) {
  const userSelected = document.querySelector('#info-content > div:nth-child(1)');
  const firstName = user.firstName || 'Unknown';
  const lastName = user.lastName || 'Unknown';

  const firstNameSpan = document.createElement('span');
  firstNameSpan.textContent = firstName;

  const lastNameSpan = document.createElement('span');
  lastNameSpan.textContent = lastName;

  // Update the first name and last name within the existing "User selected: " text
  userSelected.innerHTML = `User selected: ${firstNameSpan.outerHTML} ${lastNameSpan.outerHTML}`;

  const description = document.querySelector('#info-content > div:nth-child(2) > textarea');
  const userDescription = user.description || 'No description available';
  description.textContent = userDescription;

  const addressFields = ['streetAddress', 'city', 'state', 'zip'];
  addressFields.forEach((field, index) => {
    const addressElement = document.querySelector(`#info-content > div:nth-child(${index + 3})`);
    const fieldValue = user.address && user.address[field] ? user.address[field] : 'Unknown';

    // Check if the child span element exists
    const spanElement = addressElement.querySelector('span');
    if (spanElement) {
      spanElement.textContent = fieldValue;
    } else {
      const span = document.createElement('span');
      span.textContent = fieldValue;
      addressElement.appendChild(span);
    }
  });
}

// Add event listener to the document object
document.addEventListener('click', function (event) {
  const target = event.target;
  const tableData = document.getElementById('table-data');
  const infoContent = document.getElementById('info-content');

  // Check if the target is outside the table-data container
  if (!tableData.contains(target)) {
    // Hide and clear the info-content section
    infoContent.style.display = 'none';
    document.getElementById('search-box').value = '';
    filterTableRows('');

    // Remove active class from all rows
    const tableRows = tableData.getElementsByClassName('data-row');
    for (let i = 0; i < tableRows.length; i++) {
      tableRows[i].classList.remove('active');
    }
  }
});

// Fetch data from the URL
fetch(url)
  .then(response => response.json())
  .then(data => {
    const filteredData = data.slice(0, 10).map(({ id, firstName, lastName, email, phone, address, description }) => ({
      id,
      firstName,
      lastName,
      email,
      phone,
      address,
      description
    }));
    createTable(filteredData);
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });

  


  const searchBox = document.getElementById('searchBox');
const searchResults = document.getElementById('table-data');

searchBox.addEventListener('input', function() {
  const searchTerm = searchBox.value.toLowerCase();
  const allResults = ['result 1', 'result 2', 'result 3', 'result 4']; // Replace with your actual search results

  // Clear previous results
  searchResults.innerHTML = '';

  // Iterate through all results
  allResults.forEach(function(result) {
    const lowerCaseResult = result.toLowerCase();
    let highlightedResult = '';

    // Iterate through each character of the result
    for (let i = 0; i < result.length; i++) {
      const char = result.charAt(i);

      // If the character matches the search term, highlight it
      if (lowerCaseResult.substr(i, searchTerm.length) === searchTerm) {
        highlightedResult += `<span class="highlight">${char}</span>`;
      } else {
        highlightedResult += char;
      }
    }

    // Create a new result element and append it to the searchResults container
    const resultElement = document.createElement('div');
    resultElement.innerHTML = highlightedResult;
    searchResults.appendChild(resultElement);
  });
});

