/*VIDEOS*/

// VARS
var $locationsCarousel = $("#locations-girls").find(".owl-carousel");

var $linkLocationsGirls = $("#link-locations-girls");

var $locationsGirls = $("#locations-girls");

var $videosGirls = $("#videos-girls").find(".owl-carousel");

$(function() {
	initVideosGirls();
    initLocationsCarousel();
});

function initVideosGirls() {

    var options = {
        items: 1,
        nav: false,
        navText: false,
        dots: true,
        loop: true,
        responsive : {
            0 : {
                items: 1
            },
            320: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    };

    $videosGirls.owlCarousel(options);
}

function initLocationsCarousel() {

    var options = {
        items: 1,
        nav: true,
        navText: false,
        dots: false,
        loop: true,
        autoHeight: true,
        responsive : {
            0 : {
                items: 1,
                nav: false,
                dots: true
            },
            768 : {
                items: 1,
                nav: true,
                dots: false
            }
        }
    };

    $locationsCarousel.owlCarousel(options);

    $linkLocationsGirls.click(function() {
        openLocations();
    });

    $(document).on('click', '.anchor-locations', function(e) {
        
        e.preventDefault();
        openLocations();

        $id = $(this).data('target');

        $m = $locationsCarousel.find('.location-' + $id).parent('.owl-item:not(.cloned)');

        $iFirst = 0;

        $iMe = $locationsCarousel.children('.owl-stage-outer').children('.owl-stage').children('.owl-item').index($m);

        console.log($iMe);

        for($i = $iFirst; $i < $iMe; $i++) {
            $locationsCarousel.trigger('next.owl.carousel');
        }
    });
}

function openLocations() {
    $linkLocationsGirls.addClass('inactive');
    $('#links-girls').hide();
    $locationsGirls.fadeIn();
    $('html, body').animate({
        scrollTop: $locationsGirls.offset().top
    }, 1000);  
}