$(document).ready(function() {
  $.ajax({
    url:
      "https://api.edamam.com/search?q={+}&app_id=60ab0f71&app_key=c79295660b6df898dbeb376b6fbd7821",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.hits[0].recipe);
    newDiv = $("<div>");
    newDiv.innerHTML(response.hits[0].recipe);
    console.log(newDiv);
    $(".here").append(newDiv);
  });
  // adds user input from the shopping list input to the shopping list//

  $("#addItemBtn").on("click", function() {
    // takes in item from add textarea
    event.preventDefault();
    var newItem = $("#addItem")
      .val()
      .trim();
    // creates div for item and button
    var newDiv = $("<div>")
      .attr("class", "columns is-mobile shopitem");
    // creates li //
    var newListItem = $("<li>")
      .attr("class", "listItems column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile")
      .text(newItem);
    // adds a close button to the list items. //
    var addSpan = $("<button>")
      .attr("class", "column is-2-desktop is-2-tablet is-2-mobile listButton")
      .text("X");
    // adds item and close span to the new div //
    newDiv.append(newListItem, addSpan);
    $("#shoppingList").prepend(newDiv);
    // resets the texts field to blank
    $("#addItem").val("");
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
