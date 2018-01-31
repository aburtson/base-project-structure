readMore();

function readMore(){
    var slideSpeed = 300;
    var $buttons = $('.read-more');
    
    $buttons.on('click', function(){
        var $button = $(this);
        var $contentWrapper = $button.siblings('.read-more__content__wrapper');
        var $content = $contentWrapper.find('.read-more__content');
        var contentHeight = $content.outerHeight();

        $(window).on('resize', function(){
            contentHeight = $content.outerHeight();
        });
        
        $button.toggleClass('active');
        
        var active = $button.hasClass('active');
        
        if (active){
            $contentWrapper.stop().animate({'height': contentHeight}, slideSpeed, function(){
                $content.stop().animate({'opacity': 1}, slideSpeed);
            });
        } else {
            $content.stop().animate({'opacity': 0}, slideSpeed, function(){
                $contentWrapper.stop().animate({'height': 0}, slideSpeed);
            });
        }
    });
}