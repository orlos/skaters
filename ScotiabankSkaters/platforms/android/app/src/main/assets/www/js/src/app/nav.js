/*NAV*/

// VARS
var $navCarousel = $("#nav").find(".owl-carousel");

$(function() {
	initNavCarousel();
});

function initNavCarousel() {

    var options = {
        items: 5,
        nav: false,
        navText: false,
        dots: false,
        loop: true,
        autoWidth: false,
        responsive : {
            0 : {
                items: 2,
                nav: true
            },
            480: {
                items: 2,
                nav: true
            },
            768: {
                items: 5
            }
        }
    };

    $navCarousel.owlCarousel(options);

    $first = $navCarousel.find('.owl-item.active').first();

    $me = $navCarousel.find('.link.menu.active').parent('li').parent('.owl-item:not(.cloned)');

    $indexFirst = $navCarousel.children('.owl-stage-outer').children('.owl-stage').children('.owl-item:not(.cloned)').index($first);

    $indexMe = $navCarousel.children('.owl-stage-outer').children('.owl-stage').children('.owl-item:not(.cloned)').index($me);

    //console.log($indexFirst);

    //console.log($indexMe);

    for($i = $indexFirst; $i < $indexMe; $i++) {
        $navCarousel.trigger('next.owl.carousel');
    }
}