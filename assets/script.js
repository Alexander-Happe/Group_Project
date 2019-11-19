$(document).ready(function() {
    $(".main-search-button").on("click", function(){
        var userInput = $(".main-search").val().trim()
        console.log(userInput)
        $.ajax({
            url:
            "https://api.edamam.com/search?q=" + userInput + "&app_id=60ab0f71&app_key=c79295660b6df898dbeb376b6fbd7821",
            method: "GET"
        }).then(function(response) {
            var hits = response.hits
            console.log(response.hits)
            $(".dish-results").empty()
            for(i=0;i<hits.length;i++){
                //loops through and makes a new div for each recipe
                var recipeDiv = $("<div>");
                recipeDiv.addClass("name");
                //adds name of the recipes
                var names = hits[i].recipe.label;
                recipeDiv.text(names);
                //adds links to the divs
                var links = $("<a>")
                var recipeLinks = hits[i].recipe.url
                links.attr("href", recipeLinks)
                links.text(" Get the recipe here!")
                recipeDiv.append(links)
                //makes new image tags
                var imgs = $("<img>")
                var sourceImg = hits[i].recipe.image
                imgs.attr("src", sourceImg)
                imgs.attr("alt", "recipe img")
                imgs.attr("class", "img")
                //adds image to the divs
                recipeDiv.append(imgs)
                $(".dish-results").append(recipeDiv)
                console.log(recipeDiv)
                //adds buttons for adding ingredients
        }
    })
    
  });
  // adds user input from the shopping list input to the shopping list//

  $("#addItemBtn").on("click", function() {
    var newItem = $("#addItem")
      .val()
      .trim();
    var newListItem = $("<li>")
      .attr("class", "listItems")
      .text(newItem);
    $("#shoppingListItems").prepend(newListItem);
    $("#addItem").val("");
    // adds a close button to the list items. //
    var addSpan = $("<span>")
      .attr("class", "close")
      .text("X");
    $("li").append(addSpan);
  });

  // Click on a close button to hide the current list item
  // var close = $(".close");
  // var i;
  // for (i = 0; i < close.length; i++) {
  //   close[i].onclick = function() {
  //     var div = this.parentElement;
  //     div.style.display = "none";
  //   };
  // }
});
