footer();

function footer(){
    var $footer = $('.footer');
    var $main = $('main');

    var footerHeight = $footer.outerHeight();

    function setMainHeight(){
        $main.css('min-height', '100vh').css('min-height', '-='+footerHeight+'px');
    }

    setMainHeight();
    $(window).resize(setMainHeight);
}