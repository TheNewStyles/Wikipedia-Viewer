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

var el = document.getElementById("search-icon");
var el1 = document.getElementById("close");

el.addEventListener("click", function(e){
    searchToggle(this,e);
});

el1.addEventListener("click", function(e){
    searchToggle(this,e);
});