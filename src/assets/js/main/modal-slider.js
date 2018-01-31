'use strict';

modalSlider();

function modalSlider() {
    var $lists = $('.modal-list');

    $lists.each(function(){
        var $list = $(this);
        var $items = $list.find('.item');

        $items.each(function(i){
            var $item = $(this);
            var $link = $item.find('> a');
            var linkHref = '#target_' + i;

            $link.attr('href', linkHref);

            var target = $link[0].hash;
            var slideSplit = target.split('_');
            var modalTarget = $link.attr('data-target');

            var $modal = $(modalTarget);
            var $modalVisible = $modal.filter(':visible');
            var $container = $modal.find('.container');
            var $slider = $modal.find('.modal-slider');

            $link.on('click', function(){
                $container.css('opacity', 0);

                $(window).on('resize', function(){
                    $modalVisible.each(reposition);
                });

                function reposition(){
                    var $modal = $(this);
                    var $dialog = $modal.find('.modal-dialog');

                    $modal.css('display', 'block');
                    $dialog.css('margin-top', Math.max(0, ($(window).height() - $dialog.height()) / 2));
                }

                setTimeout(function(){
                    $slider.slick();

                    setTimeout(function(){

                        $slider.slick('unslick');
                        $slider.slick({
                            initialSlide: parseInt(slideSplit[1], 10),
                            fade: true,
                            dots: true
                        });

                        $modal.each(reposition);
                        $container.animate({ opacity: 1 }, 400);

                    }, 200);

                }, 0);
                
            });

            $modal.on('hidden.bs.modal', function(){
                $slider.slick('unslick');
            });

        });
    });
}