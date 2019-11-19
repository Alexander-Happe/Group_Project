$(document).ready(function() {
  $(".main-search-button").on("click", function() {
    var userInput = $(".main-search")
      .val()
      .trim();
    $.ajax({
      url:
        "https://api.edamam.com/search?q=" +
        userInput +
        "&app_id=60ab0f71&app_key=c79295660b6df898dbeb376b6fbd7821",
      method: "GET"
    }).then(function(response) {
      var hits = response.hits;
      console.log(response.hits);
      $(".dish-results").empty();
      for (i = 0; i < hits.length; i++) {
        //loops through and makes a new div for each recipe
        var recipeDiv = $("<div>");
        recipeDiv.addClass("name");
        //adds name of the recipes
        var names = hits[i].recipe.label;
        recipeDiv.text(names);
        //adds links to the divs
        var links = $("<a>");
        var recipeLinks = hits[i].recipe.url;
        links.attr("href", recipeLinks);
        links.text(" Get the recipe here!");
        recipeDiv.append(links);
        //makes new image tags
        var imgs = $("<img>");
        var sourceImg = hits[i].recipe.image;
        imgs.attr("src", sourceImg);
        imgs.attr("alt", "recipe img");
        imgs.attr("class", "img");
        //adds image to the divs
        recipeDiv.append(imgs);
        $(".dish-results").append(recipeDiv);
        //adds buttons for adding ingredients
        var ingredientBttn = $("<button>");
        ingredientBttn.text("See ingredients!");
        ingredientBttn.attr("class", "ingredients-button");
        recipeDiv.append(ingredientBttn);
      }
    });
  });
  // adds user input from the shopping list input to the shopping list//

  $("#addItemBtn").on("click", function() {
    // takes in item from add textarea
    event.preventDefault();
    var newItem = $("#addItem")
      .val()
      .trim();
    // creates div for item and button
    var newDiv = $("<div>").attr("class", "columns is-mobile shopitem");
    // creates li //
    var newListItem = $("<li>")
      .attr(
        "class",
        "listItems column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile"
      )
      .text(newItem);
    // adds a close button to the list items. //
    var addSpan = $("<button>")
      .attr(
        "class",
        "column is-2-desktop is-2-tablet is-2-mobile listButton close"
      )
      .text("X");
    // adds item and close span to the new div //
    newDiv.append(newListItem, addSpan);
    $("#shoppingList").prepend(newDiv);
    // resets the texts field to blank
    $("#addItem").val("");
  });

  // Add a "checked" symbol when clicking on a list item
  $(document).on("click", ".listItems", checked);

  function checked() {
    var checkedItem = $(this).toggleClass("checked");
  }
  // Click on a close button to hide the current list item
  $(document).on("click", ".close", close);

  function close() {
    $(this)
      .parent()
      .css("display", "none");
  }
});
