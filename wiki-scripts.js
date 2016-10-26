$(function() {
    
   var searchTerm;
   //if click search icon search for term    
   $('#search-icon').click(function(){
        searchTerm = $('.search-input').val().trim();        

   if(searchTerm !== undefined && searchTerm !== ""){
        // animate search bar up after search
        var $searchWrapper = $('.search-wrapper');       
        
        $searchWrapper.animate({top: "150px"}, 300);
        

        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";

          $.ajax({
              type: "GET",
              url: url,
              contentType: "application/json; charset=utf-8",
              async: false,
              dataType: "json",
              success: function (data, textStatus, jqXHR) {
                  // console.log(data);    
                  // console.log(data[1][0]);//shows main title
                  // console.log(data[2]);//shows description
                   

                  var displayCard = '';

                  for(var i=0; i<=data[1].length-1; i++){
                      displayCard += '<div class="demo-card-wide mdl-card mdl-shadow--2dp">';
                      displayCard += '<div class="mdl-card__title">';
                      displayCard += '<h2 class="mdl-card__title-text">';
                      displayCard += data[1][i];
                      displayCard += '</h2>';
                      displayCard += '</div>';
                      displayCard += '<div class="mdl-card__supporting-text">';
                      displayCard += data[2][i];  
                      displayCard += '</div>';
                      displayCard += '<div class="mdl-card__actions mdl-card--border">';
                      displayCard += '<a href="';
                      displayCard += data[3][i]; 
                      displayCard += '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank">';
                      displayCard += 'Learn More';
                      displayCard += '</a>';
                      displayCard += '</div>';
                      displayCard += '</div>';                       
                     
                      //hide random and message
                      $('#search-section').addClass('move-search-section');
                      $('#random-wiki').hide();
                      $('#click-to-search').hide();                      
                      //
                      $('#results').append(displayCard).fadeIn(2500);                      
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

