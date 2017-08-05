$(function() {
    var $searchWrapper = $('.search-wrapper');

    //if click search icon search for term
    $('#search-icon').click(function(){

       var searchTerm = $('.search-input').val().trim();
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";

       if(searchTerm !== undefined && searchTerm !== ""){

            $searchWrapper.animate({top: "150px"}, 300);

              $.ajax({
                  type: "GET",
                  url: url,
                  contentType: "application/json; charset=utf-8",
                  async: false,
                  dataType: "json",
                  success: function (data) {

                      var displayCard = '';

                      for(var i=0; i<=data[1].length-1; i++){
                          // displayCard += '<div id="display'+ i + '" class="demo-card-wide mdl-card mdl-shadow--2dp">';
                          // displayCard += '<div class="mdl-card__title">';
                          // displayCard += '<h2 class="mdl-card__title-text">';
                          // displayCard += data[1][i];
                          // displayCard += '</h2>';
                          // displayCard += '</div>';
                          // displayCard += '<div class="mdl-card__supporting-text">';
                          // displayCard += data[2][i];
                          // displayCard += '</div>';
                          // displayCard += '<div class="mdl-card__actions mdl-card--border">';
                          // displayCard += '<a href="';
                          // displayCard += data[3][i];
                          // displayCard += '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank">';
                          // displayCard += 'Learn More';
                          // displayCard += '</a>';
                          // displayCard += '</div>';
                          // displayCard += '</div>';

                          let dataInfo = {
                              name: data[1][i],
                              description: data[2][i],
                              url: data[3][i]
                          };

                          var test = get_user_widget_markup(i, dataInfo);

                          function get_user_widget_markup (iterator, dataInfo) {
                              return `<div id="display${iterator}" class="demo-card-wide mdl-card mdl-shadow--2dp">
                                     
                                        `
                          }



                          //hide random and message
                          $('#search-section').addClass('move-search-section');
                          $('#random-wiki').hide();
                          $('#click-to-search').hide();

                          document.getElementById('results').innerHTML = displayCard;
                      }

                  },
                  error: function (errorMessage) {
                    alert(errorMessage.message);
                  }
              });
        }

    });//end of search-icon click

    //if enter is pressed in search-input call the search-icon click function
    $('.search-input').keypress(function(e){
        if (e.which == 13) {
          $('#search-icon').click();
        }
    });

});

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

