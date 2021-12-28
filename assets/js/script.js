var citySearchText = "";

$("#search-button").on("click", function() {
    var text = $("#city-search").val();
    if (!text) {
        console.log("no text");
    }
    else {
        console.log(text);
        citySearchText = text
    }
});