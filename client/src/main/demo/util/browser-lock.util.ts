export function lockDown(currentPage : string)
{
    history.pushState(null, null, currentPage); 
    window.addEventListener('popstate', function(event) 
    {
        history.pushState(null, null, currentPage);
    });
    window.onbeforeunload = function () {return 'Page unload detected.  Unsaved data will be lost. ';}
    function disableRefresh(e) 
    { 
        if (e.which == 116) e.preventDefault();
        else if (e.which == 81 && e.which == 91) e.preventDefault(); 
    };
    // To disable f5
    $(document).bind("keydown", disableRefresh);
    // To re-enable f5
//    $(document).unbind("keydown", disableF5);
}