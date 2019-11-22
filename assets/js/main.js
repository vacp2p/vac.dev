jQuery(document).ready(function ($) {

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    var swyperFeatures = new Swiper ('.features', {
        simulateTouch: false,
        autoHeight: true,
        pagination: {
            el: '.features .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    })

    var swiperTable = new Swiper ('.table-holder .swiper-container', {
        simulateTouch: false,
        pagination: {
            el: '.table-holder .swiper-pagination',
            type: 'bullets',
            clickable: true
        },
    })

    $('.mobile-trigger').on('click', function (event) {
        event.preventDefault();
        $('body').toggleClass('menu-active');
    });

    var siteUrl = $('header .logo a').attr('href');
    var diff = 60;
    if(w < 992){
        diff = 30;
    }

    if($('.layout--home').length){
        $('header .menu a[href^="'+ siteUrl +'/#"], .intro a[href^="#"]').each(function (index, element) {
            var href = $(this).attr('href');
            var id = '#' + href.substr(href.indexOf("#") + 1);
            $(this).on('click', function (event) {
                event.preventDefault();
                $('body').removeClass('menu-active');
                $('html, body').animate({
                    scrollTop: $(id).offset().top - $('header').height() - diff
                }, 500);
                return false;
            });
        });
    }

    if(window.location.hash) {
        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top - $('header').height() - diff
        }, 500);
    }

});