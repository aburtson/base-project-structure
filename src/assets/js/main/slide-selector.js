$.fn.slideSelector = function(settings) {
    new SlideSelector(this, settings);
};

function SlideSelector(element, settings){
    if (settings === undefined) {
        settings = {};
    }

    // default settings
    this.module = $(element);
    this.initialSlide = 1;

    this.mobileStyle = undefined;
    this.mobileOnly = false;
    this.togglesOpen = false;

    // custom settings
    if ($(element).hasClass('ss') == false) {
        this.module = $('.ss');
    }
    if (settings.initialSlide) {
        this.initialSlide = settings.initialSlide;
    }
    switch (settings.speed) {
        case 0:
            this.speed = 0;
            break;
        case undefined:
            this.speed = 300;
            break;
        default:
            this.speed = settings.speed;
            break;
    }
    switch (settings.breakpoint) {
        case 0:
            this.breakpoint = 0;
            break;
        case undefined:
            this.breakpoint = 768;
            break;
        default:
            this.breakpoint = settings.breakpoint;
            break;
    }
    if (settings.mobileStyle) {
        this.mobileStyle = settings.mobileStyle;
    }
    if (settings.mobileOnly) {
        this.breakpoint = 999999;
    }
    if (settings.togglesOpen) {
        this.togglesOpen = settings.togglesOpen;
    }

    // elements
    this.selectorsWrapper = this.module.children('.ss__selectors');
    this.selectors = this.selectorsWrapper.children('li');
    this.slidesWrapper = this.module.children('.ss__slides');
    this.slides = this.slidesWrapper.children('div');

    // functions
    this.setMobileStyle();
    this.setActiveSlide();
    this.setSlideHeight();
    this.changeActiveSlide();
}

SlideSelector.prototype.setActiveSlide = function(){
    var $module = this.module;
    var $selectors = this.selectors;
    var $slides = this.slides;

    var breakpoint = this.breakpoint;

    var slideCount = $slides.length;
    var initialSlide = this.initialSlide;

    if (initialSlide > slideCount) {
        initialSlide = 1;
    }

    var $initialSelector = $selectors.filter(':nth-child('+initialSlide+')');
    var $initialSlide = $slides.filter(':nth-child('+initialSlide+')');

    $initialSelector.addClass('active');
    $initialSlide.addClass('active');

    function setActiveSlide(){
        var mobileView = $(window).width() <= breakpoint;
        var alternateMobileStyle = $module.hasClass('ss--mobile--default') == false;

        $selectors.each(function(){
            var $selector = $(this);
            var i = $selector.index();
            var $slide = $slides.eq(i);

            var active = $selector.hasClass('active');

            if (mobileView && alternateMobileStyle) {
                $slide.css({'opacity': 1, 'display': 'block'});
            } else {
                if (active) {
                    $slide.css({'opacity': 1, 'display': 'block'});
                } else {
                    $slide.css({'opacity': 1, 'display': 'none'});
                }
            }
        });
    }

    setActiveSlide();
    $(window).resize(setActiveSlide);
};

SlideSelector.prototype.setSlideHeight = function(){
    var $module = this.module;
    var $slides = this.slides;
    var $slidesWrapper = this.slidesWrapper;
    var breakpoint = this.breakpoint;

    function setSlideHeight(){
        var topHeight = 0;
        var mobileView = $(window).width() <= breakpoint;
        var defaultMobileStyle = $module.hasClass('ss--mobile--default');

        $slides.each(function(){
            var $slide = $(this);
            var slideHeight = $slide.outerHeight();

            if (slideHeight > topHeight) {
                topHeight = slideHeight;
            }
        });

        if (mobileView) {
            if (defaultMobileStyle){
                $slidesWrapper.css('height', topHeight);
            } else {
                $slidesWrapper.css('height', 'auto');
            }
        } else {
            $slidesWrapper.css('height', topHeight);
        }
    }

    setSlideHeight();
    $(window).resize(setSlideHeight);
};

SlideSelector.prototype.changeActiveSlide = function(){
    var $selectors = this.selectors;
    var $slides = this.slides;
    var speed = this.speed;

    $selectors.on('click', function(){
        var $selector = $(this);
        var i = $selector.index();
        var $slide = $slides.eq(i);
        var active = $selector.hasClass('active');

        if (active == false) {
            $selectors.removeClass('active');
            $slides.removeClass('active').stop().animate({'opacity': 0}, speed, function(){
                $slides.css('display', 'none');
                $selector.addClass('active');
                $slide.css('display', 'block').addClass('active').stop().animate({'opacity': 1}, speed);
            });
        }
    });
};

SlideSelector.prototype.setMobileStyle = function(){
    var object = this;
    var $module = this.module;
    var mobileStyle = this.mobileStyle;
    var breakpoint = this.breakpoint;

    object.buildMobileLayout();

    switch (mobileStyle) {
        case 'list':
            $module.addClass('ss--mobile--list');
            break;
        case 'toggle':
            $module.addClass('ss--mobile--toggle');
            object.enableToggles();
            break;
        default:
            $module.addClass('ss--mobile--default');
            break;
    }

    function setMobileState(){
        var mobileView = $(window).width() <= breakpoint;

        if (mobileView) {
            $module.addClass('ss--mobile');
        } else {
            $module.removeClass('ss--mobile');
        }
    }

    setMobileState();
    $(window).resize(setMobileState);
};

SlideSelector.prototype.buildMobileLayout = function(){
    var $selectors = this.selectors;
    var $slides = this.slides;

    $selectors.each(function(){
        var $selector = $(this);
        var i = $selector.index();
        var $slide = $slides.eq(i);
        var selectorHtml = $selector.html();

        $slide.wrapInner('<div class="ss__content__inner"></div>');
        $slide.wrapInner('<div class="ss__content"></div>');
        $slide.prepend('<div class="ss__label">'+selectorHtml+'</div>');
    });
};

SlideSelector.prototype.enableToggles = function(){
    var $slides = this.slides;
    var $toggles = $slides.children('.ss__label');
    var speed = this.speed;
    var breakpoint = this.breakpoint;
    var togglesOpen = this.togglesOpen;

    if (togglesOpen) {
        $slides.addClass('open');
    }

    function setContentHeight(){
        var mobileView = $(window).width() <= breakpoint;

        $slides.each(function(){
            var $slide = $(this);
            var $contentWrapper = $slide.children('.ss__content');
            var $content = $contentWrapper.children('.ss__content__inner');
            var open = $slide.hasClass('open');
            var contentHeight = $content.outerHeight();

            if (mobileView) {
                if (open) {
                    $contentWrapper.css('height', contentHeight);
                    $content.css('opacity', 1);
                } else {
                    $contentWrapper.css('height', 0);
                    $content.css('opacity', 0);
                }
            } else {
                $contentWrapper.css('height', 'auto');
                $content.css('opacity', 1);
            }
        });
    }

    setContentHeight();
    $(window).resize(setContentHeight);

    $toggles.on('click', function(){
        var $toggle = $(this);
        var $slide = $toggle.parent();
        var $contentWrapper = $slide.children('.ss__content');
        var $content = $contentWrapper.children('.ss__content__inner');
        var contentHeight = $content.outerHeight();

        $slide.toggleClass('open');

        var open = $slide.hasClass('open');

        if (open) {
            $contentWrapper.stop().animate({'height': contentHeight}, speed, function(){
                $content.stop().animate({'opacity': 1}, speed);
            });
        } else {
            $content.stop().animate({'opacity': 0}, speed, function(){
                $contentWrapper.stop().animate({'height': 0}, speed);
            });
        }
    });
};

// use the below function to create your slideSelector.
// if you have a customized version of the slideSelector with its own class/id, avoid using '.ss' and target that class/id instead.

$('.ss').slideSelector({
    breakpoint: 1200,
    mobileStyle: 'list'
});

/*

 all settings below are set to their default values. use this as a reference.

 $('.ss').slideSelector({
 initialSlide: 1,
 speed: 300,
 breakpoint: 768,
 // mobileStyle: 'toggle',
 mobileOnly: false,
 togglesOpen: false
 });

 */