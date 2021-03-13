/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const header = document.querySelector('.header');
const searchBarHtml = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
header.insertAdjacentHTML('beforeend', searchBarHtml);

const search = document.querySelector('#search');
const submit = document.querySelector('.student-search button');
const ul = document.querySelector('.student-list');

const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const name = `${list[i].name.first} ${list[i].name.last}`
         const image = list[i].picture.large;
         const email = list[i].email;
         const joined = list[i].registered.date;
         const html = `
            <li class="student-item" cf>
               <div class="student-details">
                  <img class="avatar" src="${image}" alt="Profile Picture">
                  <h3>${name}</h3>
                  <span class="email">${email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${joined}</span>
               </div>
            </li>
         `;
         ul.insertAdjacentHTML("beforeend", html);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numPages = Math.floor(list.length / 9) + 1;
   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   for (let i = 1; i <= numPages; i++) {
      const html = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      ul.insertAdjacentHTML('beforeend', html);
   }

   document.querySelector('.link-list button').className = 'active';

   ul.addEventListener('click', (e) => {
      if (e.target.type === 'button') {
         const pageNum = parseInt(e.target.innerText);
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, pageNum);
      }
      
   });
}

// Helper function for perfSearch() to set isMatch property
function setMatch(searchInput, list) {
   for (let i = 0; i < list.length; i++) {
      list[i].isMatch = false;
      const fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;

      if ((searchInput.value.length !== 0) && (fullName.includes(searchInput.value.toLowerCase()))) {
         list[i].isMatch = true;
      }
   }
}

// Function to perform the search
function perfSearch() {
   if (search.value.length === 0) {
         showPage(data, 1);
         addPagination(data);
   } else {
      setMatch(search, data);
      let searchResults = [];
      let count = 0;
      for (let i = 0; i < data.length; i++){
         if (data[i].isMatch) {
            searchResults[count] = data[i];
            count++;
         }
      }
      if (searchResults.length === 0) {
         ul.innerText = 'No Results Found';
         addPagination(searchResults);
      } else {
         showPage(searchResults, 1);
         addPagination(searchResults);
      }
   }
}

// Event listener for submit action
submit.addEventListener('click', () => {
   perfSearch();
});

// Event listener for key up action on search bar
search.addEventListener('keyup', () => {
   perfSearch();
});

// Call functions
showPage(data, 1);
addPagination(data);