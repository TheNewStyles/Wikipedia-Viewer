$(function() {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var thisUrl = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?";

    $.ajax({
        type: "GET",
        url: thisUrl,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);

            // TODO 
            // Do bunch of stuff here
        },
        error: function (errorMessage) {
        }
    });



});


// Toggle search bar
function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}

// Event listeners
var el = document.getElementById("search-icon");
var el1 = document.getElementById("close");

el.addEventListener("click", function(e){
    searchToggle(this,e);
});

el1.addEventListener("click", function(e){
    searchToggle(this,e);
});