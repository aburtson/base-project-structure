promo();

function promo(){
    var $site = $('.site-constraint');
    var $close = $('.promo__close');

    // show promo
    var enabled = true;

    // will hide promo after closing. otherwise, will show promo every page load
    var recordSession = false;

    if (enabled) {
        if (recordSession) {
            if (typeof(Storage) !== 'undefined') {
                if (sessionStorage.getItem('showPromo')) {
                    if (sessionStorage.getItem('showPromo') == 'false') {
                        $site.removeClass('show-promo');
                    }
                } else {
                    $site.addClass('show-promo');
                }
            }
        } else {
            $site.addClass('show-promo');
        }
    }

    $close.on('click', function(){
        $site.removeClass('show-promo');

        if (recordSession) {
            sessionStorage.setItem('showPromo', 'false');
        }
    });
}