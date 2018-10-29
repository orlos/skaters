/*VIDEOS*/

// VARS
var $videosCarousel = $(".videos").find(".owl-carousel");

$(function() {
    initVideoPlayer();
    initLargeVideoPlayer();
	initVideosCarousel();
});

function initVideosCarousel() {

    var options = {
        items: 3,
        nav: true,
        navText: false,
        loop: true,
        responsive : {
            0 : {
                items: 1,
                nav: false,
                dots: true
            },
            768: {
                items: 2,
                nav: true,
                dots: false
            },
            1024: {
                items: 3,
                nav: true,
                dots: false
            }
        }
    };

    $videosCarousel.owlCarousel(options);
}

function initVideoPlayer() {

    $('.video-player').click(function() {
        $(this).removeClass('covered');
        var $videoSlug = $(this).data('youtube');
        $(this).html('<iframe width="560" height="423" src="https://www.youtube.com/embed/' + $videoSlug + '?autoplay=1" frameborder="0"></iframe>');
    });

}

function initLargeVideoPlayer() {

    $('.full-video-player').click(function() {
        $(this).removeClass('covered');
        var $videoSlug = $(this).data('youtube');
        $("#player").html('<iframe width="100%" height="474" src="https://www.youtube.com/embed/' + $videoSlug + '?autoplay=1&rel=0" frameborder="0"></iframe>');
        $(".video-title").html($(this).data('title'));
    });
    
}