$(function() {
    var $searchWrapper = $('.search-wrapper');
    var searchIconEl = document.getElementById("search-icon");
    var closeSearchEl = document.getElementById("close");

    //if click search icon search for term
    $('#search-icon').click(function(){

       var searchTerm = $('.search-input').val().trim();
       var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="${searchTerm}"&format=json&callback=?`;

       if(searchTerm !== undefined && searchTerm !== ""){

            $searchWrapper.animate({top: "150px"}, 300);

              $.ajax({
                  type: "GET",
                  url: url,
                  contentType: "application/json; charset=utf-8",
                  async: false,
                  dataType: "json",
                  success: function (data) {

                      for(var i=0; i<=data[1].length-1; i++){

                          let dataInfo = {
                              name: data[1][i],
                              description: data[2][i],
                              url: data[3][i]
                          };

                          var test = getDataMarkUp(i, dataInfo);

                          function getDataMarkUp (iterator, dataInfo) {
                              return `<div id="display${iterator}" class="demo-card-wide mdl-card mdl-shadow--2dp">
                                        <div class="mdl-card__title">   
                                            <h2 class="mdl-card__title-text">
                                                ${dataInfo.name}
                                            </h2>
                                        </div>
                                        <div class="mdl-card__supporting-text">
                                            ${dataInfo.description}
                                        </div>
                                        <div class="mdl-card__actions mdl-card--border">
                                            <a href="${dataInfo.url}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank">
                                            Learn More
                                        </div>
                                      </div>`
                          }

                          $('#search-section').addClass('move-search-section');
                          $('#random-wiki').hide();
                          $('#click-to-search').hide();
                          document.getElementById('results').innerHTML += test;
                      }
                  },
                  error: function (errorMessage) {
                    alert(errorMessage.message);
                  }
              });
        }
    });

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
        if (!container.hasClass('active')) {
            container.addClass('active');
            evt.preventDefault();
        }
        else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            container.find('.search-input').val('');
        }
    }

    //if enter is pressed in search-input call the search-icon click function
    $('.search-input').keypress(function(e){
        if (e.which == 13) {
            $('#search-icon').click();
        }
    });
});



