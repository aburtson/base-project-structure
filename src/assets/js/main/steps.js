steps();

function steps() {
    $(window).on('scroll', function() {
        var windowScroll = $(this).scrollTop();
        var windowHeight = $(this).height();
        var scrollPos = windowScroll + (windowHeight / 1.3);
        var $steps = $('.steps .step');
        var $line = $('.steps__line');
        var stepsHeight = $('.steps').height();

        if($line.length){
            var linePos = $line.offset().top;
        }

        if (scrollPos >= linePos) {
            if (scrollPos >= linePos + stepsHeight) {
                $line.css('height', stepsHeight);
            } else {
                var lineDiff = (scrollPos - linePos - 100);
                $line.css('height', lineDiff);
            }
        }

        $steps.each(function(i){
            var $step = $(this);
            var stepPos = $step.offset().top;

            if (i > 0) {
                $step.css('opacity', '0');
                if (scrollPos >= stepPos) {
                    if (scrollPos >= stepPos + 100) {
                        $step.css('opacity', '1');
                    } else {
                        var diff = (scrollPos - stepPos) / 100;
                        $step.css('opacity', diff);
                    }
                }
            }
        });
    });
}