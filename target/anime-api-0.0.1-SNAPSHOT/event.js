// AJAX: Asynchronous Javascript and XML

const { Button } = require("bootstrap");


// DOMContentLoaded: fires when the document object model is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // create a GET request to retrieve ALL movies, and add them to the table

    // 1. make an xhr object (ready state is 0)
    let xhr = new XMLHttpRequest();		// make HTTP requests

    // 2. define what happens during the AJAX call
    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4) {	
            // ONLY do something once the ready state is 4 (done)
            console.log(JSON.parse(xhr.responseText));		// JSON.parse() to parse JSON 

            var animeArray = JSON.parse(xhr.responseText);	// creating an array of JSON anime objects

            // looping through the array and adding each element to our table
            animeArray.forEach(animeElement => {
                addAnimeToTable(animeElement);
            });

        }
    }


    // 3. open the xhr call with the http request verb and the url
    xhr.open('GET', '/anime-api/api/anime');

    // 4. send the ajax call
    xhr.send();
});

// low-level DOM Manipulation
function addAnimeToTable(anime) {
    

    // creating all of our needed DOM elements
    var tr = document.createElement('tr');		     // creates our <tr> element (row)
    var name = document.createElement('td');		// creates a <td> for every column
    var creator = document.createElement('td'); 
    var mediaType = document.createElement('td'); 	
    var numOfEpisodes = document.createElement('td'); 
    var rating = document.createElement('td'); 
    var hasWatched = document.createElement('td'); 
    var studioName = document.createElement('td'); 
    var iCompleted = document.createElement('td'); 
    var rowActions = document.createElement('td');
    //create 1 more for icons (update/delete)

    // adding data to the elements
    name.innerText = anime.name;
    creator.innerText = anime.creator;
    mediaType.innerText = anime.mediaType;
    numOfEpisodes.innerText = anime.numOfEpisodes;
    rating.innerText = anime.rating;
    hasWatched.innerText = anime.hasWatched;
    studioName.innerText = anime.studioName;
    iCompleted.innerText = anime.icompleted;
    rowActions.innerHTML = "<button class='btnBack' id='editBtn'> <i class='fas fa-edit'></i> </button> \
                            <button class='btnBack' id='deleteBtn'> <i class='fas fa-trash-alt'></i> </button> "
    

    // add <td> (column data) to our <tr> (row)
    tr.appendChild(name);
    tr.appendChild(creator);
    tr.appendChild(mediaType)
    tr.appendChild(numOfEpisodes);
    tr.appendChild(rating);
    tr.appendChild(hasWatched);
    tr.appendChild(studioName);
    tr.appendChild(iCompleted); //made c lowercase because that is how it looks in the json
    tr.appendChild(rowActions);
    // tr.appendChild(editbtn);
    // tr.appendChild(deletebtn);

    // add our <tr> to our <tbody> (the id for this tbody is 'anime-table')
    document.getElementById('anime-table').appendChild(tr);
}


// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("createButton");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// } //fix lines 85-108

Button.getElementByID("createButton").addEventListener('click', function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("createButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }   

});



document.getElementById('new-anime-form').addEventListener('submit', function(event) {
    event.preventDefault();		// prevent default form actions from occuring

    // get the data from the form
    var nameForm = document.getElementById('anime-name').value;		// retrieve the data from the forms input boxes
    var creatorForm = document.getElementById('anime-creator').value;	
    var mediaForm = document.getElementById('anime-mediaType').value;
    var episodeForm = document.getElementById('anime-episodes').value;
    var ratingForm = document.getElementById('anime-rating').value;
    var watchedForm = document.getElementById('anime-hasWatched').value;
    var studioForm = document.getElementById('anime-studio').value;
    var completedForm = document.getElementById('anime-iCompleted').value;
    


    // ES6+ allows for object literal syntax: basically JSON objects on the fly
    //create anime object
    var anime = {
        name : nameForm,
        creator : creatorForm,
        mediaType : mediaForm,
        numOfEpisodes : episodeForm,
        rating : ratingForm,
        hasWatched : watchedForm,
        studioName : studioForm,
        iCompleted : completedForm
    };

    // make AJAX call


    // 1. make an xhr object (ready state is 0)
    let xhr = new XMLHttpRequest();		// make HTTP requests

    // 2. define what happens during the AJAX call
    xhr.onreadystatechange = function() {
        
        if(xhr.readyState === 4) {	

            // getting back the updated anime object
            var newAnime = JSON.parse(xhr.responseText);

            // adding the updated anime to our table
            addAnimeToTable(newAnime);

            // reset the form
            document.getElementById('new-anime-form').reset();
        }
    }


    // 3. open the xhr call with the http request verb and the url
    xhr.open('POST', '/anime-api/api/anime');

    // 4. send the ajax call
    xhr.send(JSON.stringify(anime));	// converting from variable to JSON and sending it in the POST request
});



document.getElementById('editBtn').addEventListener('click', function(event) {
    event.preventDefault();		// prevent default form actions from occuring

    // get the data from the form
    var nameForm = document.getElementById('anime-name').value;		// retrieve the data from the forms input boxes
    var creatorForm = document.getElementById('anime-creator').value;	
    var mediaForm = document.getElementById('anime-mediaType').value;
    var episodeForm = document.getElementById('anime-episodes').value;
    var ratingForm = document.getElementById('anime-rating').value;
    var watchedForm = document.getElementById('anime-hasWatched').value;
    var studioForm = document.getElementById('anime-studio').value;
    var completedForm = document.getElementById('anime-iCompleted').value;
    


    // ES6+ allows for object literal syntax: basically JSON objects on the fly
    //create anime object
    var anime = {
        name : nameForm,
        creator : creatorForm,
        mediaType : mediaForm,
        numOfEpisodes : episodeForm,
        rating : ratingForm,
        hasWatched : watchedForm,
        studioName : studioForm,
        iCompleted : completedForm
    };

    // make AJAX call


    // 1. make an xhr object (ready state is 0)
    let xhr = new XMLHttpRequest();		// make HTTP requests

    // 2. define what happens during the AJAX call
    xhr.onreadystatechange = function() {
        
        if(xhr.readyState === 4) {	

            // getting back the updated anime object
            var editedAnime = JSON.parse(xhr.responseText);

            // adding the updated anime to our table
            addAnimeToTable(editedAnime);

            // reset the form
            document.getElementById('new-anime-form').reset();
        }
    }


    // 3. open the xhr call with the http request verb and the url
    xhr.open('PUT', '/anime-api/api/anime');

    // 4. send the ajax call
    xhr.send(JSON.stringify(anime));	// converting from variable to JSON and sending it in the POST request
});