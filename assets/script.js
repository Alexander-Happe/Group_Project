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
    var newItem = $("#addItem")
      .val()
      .trim();
    var newListItem = $("<li>")
      .attr("class", "listItems")
      .text(newItem);
    event.preventDefault("#addItemBtn")
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
