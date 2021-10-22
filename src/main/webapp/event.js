


var entry = null;

// DOMContentLoaded: fires when the document object model is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  
    // 1. make an xhr object (ready state is 0)
    let xhr = new XMLHttpRequest();		// make HTTP requests

    // 2. define what happens during the AJAX call
    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4) {	

            
            var animeArray = JSON.parse(xhr.responseText);	// creating an array of JSON anime objects

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
    var id = document.createElement('td');
    var name = document.createElement('td');		// creates a <td> for every column
    var creator = document.createElement('td'); 
    var mediaType = document.createElement('td'); 	
    var numOfEpisodes = document.createElement('td'); 
    var rating = document.createElement('td'); 
    var hasWatched = document.createElement('td'); 
    var studioName = document.createElement('td'); 
    var icompleted = document.createElement('td'); 
    var rowActions = document.createElement('td');


    id.setAttribute("id","anime-id");

    // adding data to the elements
    id.innerText = anime.id;
    name.innerText = anime.name;
    creator.innerText = anime.creator;
    mediaType.innerText = anime.mediaType;
    numOfEpisodes.innerText = anime.numOfEpisodes;
    rating.innerText = anime.rating;
    hasWatched.innerText = anime.hasWatched;
    studioName.innerText = anime.studioName;
    icompleted.innerText = anime.icompleted;
    rowActions.innerHTML = "<button class='btnBack' id='editBtn' onClick='editEntry(this);'> <i class='fas fa-edit'></i> </button> \
                            <button class='btnBack' id='deleteBtn' onClick='deleteEntry(this, event);'> <i class='fas fa-trash-alt'></i> </button>";
    



    // add <td> (column data) to our <tr> (row)
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(creator);
    tr.appendChild(mediaType)
    tr.appendChild(numOfEpisodes);
    tr.appendChild(rating);
    tr.appendChild(hasWatched);
    tr.appendChild(studioName);
    tr.appendChild(icompleted); //made c lowercase because that is how it looks in the json
    tr.appendChild(rowActions);

    // add our <tr> to our <tbody> (the id for this tbody is 'anime-table')
    document.getElementById('anime-table').appendChild(tr);
    
}



var modal = document.getElementById("myModal");
var btn = document.getElementById("createButton");
var span = document.getElementsByClassName("close")[0]; 
btn.onclick = function() {
  modal.style.display = "block";

}

span.onclick = function() {
  modal.style.display = "none";
  document.getElementById('new-anime-form').reset();
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 



document.getElementById('new-anime-form').addEventListener('submit', function(event) {
    event.preventDefault();		// prevent default form actions from occuring

    // get the data from the form
    var idForm = document.getElementById('anime-id').value;
    var nameForm = document.getElementById('anime-name').value;		// retrieve the data from the forms input boxes
    var creatorForm = document.getElementById('anime-creator').value;	
    var mediaForm = document.getElementById('anime-mediaType').value;
    var episodeForm = document.getElementById('anime-episodes').value;
    var ratingForm = document.getElementById('anime-rating').value;
    var watchedForm = document.getElementById('anime-hasWatched').value;
    var studioForm = document.getElementById('anime-studio').value;
    var completedForm = document.getElementById('anime-icompleted').value;
    


    // ES6+ allows for object literal syntax: basically JSON objects on the fly
    //create anime object
    var anime = {
        id: idForm,
        name : nameForm,
        creator : creatorForm,
        mediaType : mediaForm,
        numOfEpisodes : episodeForm,
        rating : ratingForm,
        hasWatched : watchedForm,
        studioName : studioForm,
        icompleted : completedForm
    };

    // make AJAX calls

    // 1. make an xhr object 
    let xhr = new XMLHttpRequest();

    if( entry == null){ //Row isn't selected so a entry must be created

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

        
    } else {

        xhr.onreadystatechange = function() {
            
            if(xhr.readyState === 4){
                var updatedAnime = JSON.parse(xhr.responseText);
                updateEntry(updatedAnime);
                document.getElementById('new-anime-form').reset();
            }
        }

        xhr.open('PUT', '/anime-api/api/anime');
        xhr.send(JSON.stringify(anime));

    }
    
});


function editEntry(a){
    modal.style.display = "block";
    entry = a.parentNode.parentNode; //entry.cells[0] is the id
    
    document.getElementById('anime-id').value = entry.cells[0].innerHTML;
    document.getElementById('anime-name').value = entry.cells[1].innerHTML;		
    document.getElementById('anime-creator').value = entry.cells[2].innerHTML;	
    document.getElementById('anime-mediaType').value = entry.cells[3].innerHTML;
    document.getElementById('anime-episodes').value = entry.cells[4].innerHTML;
    document.getElementById('anime-rating').value = entry.cells[5].innerHTML;
    document.getElementById('anime-hasWatched').value = entry.cells[6].innerHTML;
    document.getElementById('anime-studio').value = entry.cells[7].innerHTML;
    document.getElementById('anime-icompleted').value = entry.cells[8].innerHTML;

}

function updateEntry(anime){

    entry.cells[0].innerHTML = anime.id;
    entry.cells[1].innerHTML = anime.name;
    entry.cells[2].innerHTML = anime.creator;
    entry.cells[3].innerHTML = anime.mediaType;
    entry.cells[4].innerHTML = anime.numOfEpisodes;
    entry.cells[5].innerHTML = anime.rating;
    entry.cells[6].innerHTML = anime.hasWatched;
    entry.cells[7].innerHTML = anime.studioName;
    entry.cells[8].innerHTML = anime.icompleted;
}

function deleteEntry(a, event){
    
    entry = a.parentNode.parentNode; 

    //put in array so it doesn't include the buttons
    var anime = {
        id: entry.cells[0].innerHTML,
        name : entry.cells[1].innerHTML,
        creator : entry.cells[2].innerHTML,
        mediaType : entry.cells[3].innerHTML,
        numOfEpisodes : entry.cells[4].innerHTML,
        rating : entry.cells[5].innerHTML,
        hasWatched : entry.cells[6].innerHTML,
        studioName : entry.cells[7].innerHTML,
        icompleted : entry.cells[8].innerHTML,
    };

    if(confirm('Are you sure you want to delete '+ anime.name+'?') == true){
        event.preventDefault();
        doDelete(anime, entry);
    };
    

}

function doDelete(anime, entry){

    let xhr = new XMLHttpRequest();	
    
    xhr.onreadystatechange = function() {
        
        if(xhr.readyState === 4) {	
            
            //anime = JSON.parse(xhr.responseText);
            console.log(entry.rowIndex);
            document.getElementById('anime-table').deleteRow(entry.rowIndex-1);
            
            //window.location.reload(true); //refreshes but we don't want that
        }
    }

    xhr.open('DELETE', '/anime-api/api/anime');

    xhr.send(JSON.stringify(anime));
    
}


document.getElementById('searchButton').addEventListener('click', function(event){
    console.log("I am here");

    var search = document.getElementById('search');
    search.style.display = 'block';

    var close =  document.getElementsByClassName("exit")[0];
    close.style.display = 'inline';
    close.onclick = function(){
        search.style.display = 'none';
        close.style.display ='none';
    }

});

function searchBar(){

    var table, tr, td, text, input, filter;
    var input = document.getElementById('search');
    var filter = input.value.toLowerCase();

    var table = document.getElementById('anime-table');
    var tr = table.getElementsByTagName('tr');

    for(let i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[1];
        if(td){
            text = td.innerText;
            if(text.toLowerCase().indexOf(filter) >-1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none"
            }
        }
    }



}




