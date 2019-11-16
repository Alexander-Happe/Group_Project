$(document).ready(function(){
    $.ajax({
        url: "https://api.edamam.com/search?q=chicken&app_id=60ab0f71&app_key=c79295660b6df898dbeb376b6fbd7821",
        method: "GET"
    }).then(function(response){
        console.log(response)
        console.log(response.hits[0].recipe)
        newDiv = $("<div>")
        newDiv.innerHTML(response.hits[0].recipe)
        console.log(newDiv)
        $(".here").append(newDiv)
    })
})