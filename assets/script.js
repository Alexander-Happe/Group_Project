$(document).ready(function() {
  $.ajax({
    url:
      "https://api.edamam.com/search?q=chicken&app_id=60ab0f71&app_key=c79295660b6df898dbeb376b6fbd7821",
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
    $("#shoppingListItems").prepend(newListItem);
    $("#addItem").val("");
  });

  // adds a close button to the list items. //
  var myShoppingList = $(".listItems");
  console.log($("#shoppingListItems"));
  var i;
  for (i = 0; i < myShoppingList.length; i++) {
    var span = $("SPAN").attr("class", "close");
    console.log(span);
    var txt = document.createTextNode("X");
    span.appendChild(txt);
    myShoppingList[i].appendChild(span);
  }
});
