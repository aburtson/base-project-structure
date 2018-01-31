/*  video modal ***********************************************************************
 **************************************************************************************/
// must have a .site-constraint or body set to relative

videoModal();

function videoModal() {
    var $siteConstraint = $('.site-constraint');
    var $body = $('body');

    $('[data-video]').on('click', function(){
        var videoType = $(this).attr('data-video');
        var videoID = $(this).attr('data-video-id');
        var videoEmbed;

        if (videoType == 'youtube') {
            videoEmbed = '<iframe src="https://www.youtube.com/embed/' + videoID + '?enablejsapi=1&iv_load_policy=3&playerapiid=wrapper_component_21&disablekb=1&wmode=transparent&controls=1&playsinline=0&showinfo=0&modestbranding=1&rel=0&autoplay=1&loop=0&vq=auto" frameborder="0" allowfullscreen></iframe>';
        }
        if (videoType == 'wistia') {
            videoEmbed = '<script src="//fast.wistia.com/embed/medias/'+ videoID +'.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_'+ videoID +' seo=false videoFoam=true" style="height:100%;width:100%"></div></div></div>';
        }
        var videoModal = $(
            '<div class="video-modal">' +
                '<div class="video-modal__inner">' +
                    '<span class="video-modal__close"></span>' +
                    '<div class="video__wrapper">' +
                        videoEmbed +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        $siteConstraint.append(videoModal);
        setTimeout(function(){
            $body.addClass('video-modal--active');
        }, 200);
    });
    $(document).on('click', '.video-modal', function(){
        var $this = $(this);
        $body.removeClass('video-modal--active');
        console.log('removed active class');
        setTimeout(function(){
            $this.remove();
        }, 500);
    });
    $(document).on('click', '.video-modal__inner', function(e){
        e.stopPropagation();
    });
    $(document).on('click', '.video-modal__close', function(){
        $body.removeClass('video-modal--active');
        setTimeout(function(){
            $('.video-modal').remove();
        }, 500);
    });
}