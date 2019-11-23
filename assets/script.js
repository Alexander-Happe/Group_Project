$(document).ready(function() {
  $(".main-search-button").on("click", function() {
    var userInput = $(".main-search")
      .val()
      .trim();
    $.ajax({
      url:
        "https://api.edamam.com/search?q=" +
        userInput +
        "&app_id=aa7e15d0&app_key=95bc405156202f2376c3c63ef483565b",
      method: "GET"
    }).then(function(response) {
      var hits = response.hits;
      console.log(response.hits);
      $(".dish-results").empty();
      for (i = 0; i < hits.length; i++) {
        //loops through and makes a new div for each recipe
        var recipeDiv = $("<div>");
        recipeDiv.addClass("name column is-5 has-text-centered subtitle");
        //adds name of the recipes
        var names = hits[i].recipe.label;
        recipeDiv.text(names);
        //adds div for buttons (style) ****This is so bulma understands how to lay out the buttons
        var resultbuttons = $("<div>");
        resultbuttons.addClass("columns is-mobile is-centered");
        recipeDiv.append(resultbuttons);
        //adds links to the divs
        var links = $("<a>");
        var recipeLinks = hits[i].recipe.url;
        console.log(recipeLinks);
        links.addClass(
          "column is-5-desktop is-5-tablet is-5-mobile search-item"
        );
        links.attr("href", recipeLinks);
        links.attr("target", "_blank");
        links.text("Recepie Source");
        resultbuttons.append(links);
        //adds buttons for adding ingredients
        var ingredientBttn = $("<button>");
        ingredientBttn.text("Save Ingredients");
        ingredientBttn.attr(
          "class",
          "ingredients-button column is-5-desktop is-5-tablet is-5-mobile search-item"
        );
        ingredientBttn.attr("value", hits[i].recipe.ingredientLines);
        ingredientBttn.attr("data-link", recipeLinks);
        ingredientBttn.attr("data-name", names);
        resultbuttons.append(ingredientBttn);
        //makes new image tags
        var imgs = $("<img>");
        var sourceImg = hits[i].recipe.image;
        imgs.attr("src", sourceImg);
        imgs.attr("alt", "recipe img");
        imgs.attr("class", "img image is-250x250");
        //adds image to the divs
        recipeDiv.append(imgs);
        $(".dish-results").append(recipeDiv);
      }
    });
  });
  $(document).on("click", ".ingredients-button", function() {
    var linkDiv = $("<div>")
    .attr(
      "class",
      "savedDish"
    );
    var saveLink = $("<a>");
    console.log($(this).attr("data-link"));
    saveLink.attr("href", $(this).attr("data-link"));
    saveLink.attr("target", "_blank");
    saveLink.text($(this).attr("data-name"));
    linkDiv.append(saveLink);
    $(".savedMeals").append(linkDiv);
    var ingredientsShop = $(this)
      .val()
      .split(",");
    var iterator = ingredientsShop.values();
    for (var value of iterator) {
      // creates div for item and button
      var newDiv = $("<div>").attr("class", "columns is-mobile shopitem");
      // creates li //
      var newListItem = $("<li>")
        .attr(
          "class",
          "listItems column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile"
        )
        .text(value);
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
      localStorage.setItem(value, value);
    }
  });
  // adds user input from the shopping list input to the shopping list//
  $("#addItemBtn").on("click", function() {
    createListItems();
  });
  $(document).on("click", ".search-item", function() {
    console.log("working");
  });

  function createListItems() {
    // takes in item from add textarea
    event.preventDefault();
    var newItem = $("#addItem")
      .val()
      .trim();
    if (newItem === "") {
      $("#addItem").val("");
    } else {
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
      localStorage.setItem(newItem, newItem);
    }
  }

  // Add a line-through when clicking on a list item
  $(document).on("click", ".listItems", checked);

  function checked() {
    var checkedItem = $(this).toggleClass("checked");
  }
  // Click on a close button to hide the current list item
  $(document).on("click", ".close", close);

  function close() {
    var self = $(this);
    self.parent().css("display", "none");
    localStorage.removeItem(
      self
        .parent()
        .find("li")
        .text()
    );
  }

  //Pulls all previously added list items from local storage and displays them.
  function showStorage() {
  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]));
  }
  for (j = 0; j < values.length; j++) {
    var newDiv = $("<div>").attr("class", "columns is-mobile shopitem");
    var newListItem = $("<li>")
      .attr(
        "class",
        "listItems column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile"
      )
      .text(values[j]);
    var addSpan = $("<button>")
      .attr(
        "class",
        "column is-2-desktop is-2-tablet is-2-mobile listButton close"
      )
      .text("X");
    newDiv.append(newListItem, addSpan);
    $("#shoppingList").prepend(newDiv);
  }
}
showStorage();

  // add grocery list items to local storage
  // var myList = $(document).$(".listItems");

  // for (var i = 0; i < myList.length; i++) {}

  // local();
});
