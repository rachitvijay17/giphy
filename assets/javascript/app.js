var topics = ["DOG", "CAT"];

var apikey = "lvj9W4gFySHcSHbQcDUeDeEvOThHWuPL";
var no_of_animals = 10;
var image_array = [];
var image_object = {
    title: '',
    state: '',
    image_still: '',
    image_animate: '',
}


function displayAnimalInfo() {

    var animal = $(this).attr("data-name");

    //var queryURL = "https://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=trilogy";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key="+apikey+"&limit="+no_of_animals;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);

      var results = response.data;
      //$("#gifs").empty();

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            
            image_object.state = "animate";
            image_object.title = results[i].title;
            image_object.image_still = results[i].images.fixed_height_still.url;
            image_object.image_animate = results[i].images.fixed_height.url;
            
            image_array.push(image_object);
            // Creating and storing a div tag
            var animalDiv = $("<div>");

            animalDiv.attr("id", "animal_des");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "animate");
            animalImage.attr("class", "cutie");


            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs" div
            $("#gifs").prepend(animalDiv);

          }
    });
  }


  $("#gifs").on("click", "img", function() {
     // debugger;
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    console.log(this);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    //debugger;
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      //debugger;
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      //debugger;
    }
  });


function renderButtons() {

    // Deleting the movie buttons prior to adding new animal buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#animals-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("animal");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#animals-view").append(a);
    }
  }


function alertanimalName() {

var animalname = $(this).attr("data-name");
console.log(animalname);

}

  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim().toUpperCase();
    console.log(animal);
    // The animal from the textbox is then added to our array
    
    if(animal != ''){
    if (topics.indexOf(animal)<=-1){
        
        topics.push(animal);
        
        renderButtons();
        } 
    else{
          alert("Your animal already exit is the list!");
        }}else
    // if (animal == '')
    {
        alert("Please enter the name of the animal")
    }    

    document.getElementById("animal-input").value = '';

    // calling renderButtons which handles the processing of our topic array
    
  });

$(document).on("click", ".animal", displayAnimalInfo);

renderButtons();  