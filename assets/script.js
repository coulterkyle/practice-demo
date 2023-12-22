
const endpoint = "{endpoint}"; // Replace {endpoint} with the desired endpoint

const url = `https://www.loc.gov/${endpoint}/?fo=json`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
// Function to fetch data from the Library of Congress API
function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results);
  }

  // Function to display the search results
  function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    
    // Clear previous results
    searchResultsContainer.innerHTML = '';

    // Display each result
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.textContent = result.title;
      searchResultsContainer.appendChild(resultElement);
    });
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;

    // Build the API request URL
    let url = 'https://www.loc.gov/search/';

    // Check if a format is specified
    const formatParam = new URLSearchParams(window.location.search).get('format');
    if (formatParam) {
      url += 'format/' + formatParam + '/';
    }

    // Add the search query to the URL
    url += '?q=' + encodeURIComponent(query);

    // Fetch data from the API and display the results
    fetchData(url)
      .then(results => displayResults(results))
      .catch(error => console.error(error));
  }

  // Add event listener to the form
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleFormSubmit);

  // Parse query parameters on page load
  const queryParams = new URLSearchParams(window.location.search);
  const formatParam = queryParams.get('format');

  // Use format endpoint if format query parameter is specified
  if (formatParam) {
    const formatUrl = 'https://www.loc.gov/format/' + formatParam + '/';
    fetchData(formatUrl)
      .then(results => displayResults(results))
      .catch(error => console.error(error));
  }
  // Use search endpoint if format query parameter is not specified
  else {
    const searchUrl = 'https://www.loc.gov/search/';
    fetchData(searchUrl)
      .then(results => displayResults(results))
      .catch(error => console.error(error));
  }

// Function to fetch data from the Library of Congress API
const fetchData = async () => {
  let apiUrl = 'https://www.loc.gov/search/';
  
  // Check if there is a value for the format query parameter
  if (formatParam) {
    apiUrl += 'format/';
    apiUrl += formatParam;
  } else {
    apiUrl += 'all/';
  }
  
  apiUrl += '?fo=json';
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Handle the response data and display it on the page
    displayData(data);
  } catch (error) {
    console.error(error);
  }
};

// Function to display the data on the page
const displayData = (data) => {
  // Access the results property from the response object
  const results = data.results;
  
  // Display the results on the page as desired
  // ...
};

// Call the fetchData function when the page loads
window.addEventListener('DOMContentLoaded', fetchData);