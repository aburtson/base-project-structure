$.fn.accordion = function(settings){
    new Accordion(this, settings);
};

function Accordion(element, settings) {
    if (settings === undefined) { settings = {}; }
    
    this.module = $(element);
    this.speed = 300;
    this.fade = true;
    this.sectionsOpen = false;

    if ($(element).hasClass('accordion') == false) {
        this.module = $('.accordion');
    }

    switch (settings.speed) {
        case 0:
            this.speed = 0;
            break;
        case false:
            break;
        default:
            this.speed = settings.speed;
            break;
    }

    if (settings.fade == false) {
        this.fade = false;
    }

    if (settings.sectionsOpen) {
        this.sectionsOpen = settings.sectionsOpen;
    }
    
    this.buildAccordion();
}

Accordion.prototype.buildAccordion = function(){
    var $module = this.module;
    var $items = $module.children('li');

    var sectionsOpen = this.sectionsOpen;
    var speed = this.speed;
    var fade = this.fade;
    var slideSpeed = speed;
    var fadeSpeed = 0;
    var fadeInDelay = 0;

    if (fade == true) {
        fadeSpeed = speed;
        fadeInDelay = speed;
    }

    if (sectionsOpen.constructor === Array) {
        $.each(sectionsOpen, function(index, value){
            var section = value - 1;

            if (value == 'first') {
                section = 0;
            } else if (value == 'last') {
                section = $items.length - 1;
            }

            $items.eq(section).addClass('active');
        });
    }

    switch (sectionsOpen){
        case 'all':
            $items.addClass('active');
            break;
        case 'first':
            $items.eq(0).addClass('active');
            break;
        case 'last':
            $items.eq($items.length - 1).addClass('active');
            break;
        case 'none':
            break;
        case false:
        case 0:
            $items.removeClass('active');
            break;
        default:
            $items.eq(sectionsOpen - 1).addClass('active');
            break;
    }

    $items.each(function(){
        var $item = $(this);
        var $title = $item.children('.accordion__title');
        var $contentWrapper = $item.children('.accordion__content__wrapper');
        var $content = $contentWrapper.children('.accordion__content');

        if (fade == false) {
            $content.css('opacity', 1);
        }

        function resetContentHeight(){
            var contentHeight = $content.outerHeight();
            var active = $item.hasClass('active');

            if (active) {
                $contentWrapper.css('height', contentHeight);
                $content.css('opacity', 1);
            }
        }

        resetContentHeight();
        $(window).resize(resetContentHeight);

        $title.on('click', function(){
            var contentHeight = $content.outerHeight();

            $item.toggleClass('active');

            var active = $item.hasClass('active');

            if (active) {
                $contentWrapper.stop().animate({'height': contentHeight}, slideSpeed);
                if (fade){
                    setTimeout(function(){
                        $content.stop().animate({'opacity': 1}, fadeSpeed);
                    }, fadeInDelay);
                }
            } else {
                if (fade){
                    $content.stop().animate({'opacity': 0}, fadeSpeed);
                }
                $contentWrapper.stop().animate({'height': 0}, slideSpeed);
            }
        });
    });
};

$('.accordion').accordion({
    speed: 300,
    fade: true,
    sectionsOpen: 'first'
});