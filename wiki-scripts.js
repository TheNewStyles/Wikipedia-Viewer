$(function() {
    
    var searchTerm;
    //if click search icon search for term
    $('#search-icon').click(function(){
        searchTerm = $('.search-input').val().trim();

    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";

      $.ajax({
          type: "GET",
          url: url,
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

    });//end of search-icon click

    //if enter is pressed in search-input call the search-icon click function
    $('.search-input').keypress(function(e){
        if (e.which == 13) {
          $('#search-icon').click();
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
var searchIconEl = document.getElementById("search-icon");
var closeSearchEl = document.getElementById("close");

if(searchIconEl && closeSearchEl){
   searchIconEl.addEventListener("click", function(e){
      searchToggle(this,e);
  });

   closeSearchEl.addEventListener("click", function(e){
       searchToggle(this,e);
   });
}

