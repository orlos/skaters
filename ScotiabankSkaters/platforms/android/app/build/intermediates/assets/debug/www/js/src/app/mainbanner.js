/*MAIN BANNER*/

// VARS
var $logosCarousel = $(".mainbanner-boys").find(".owl-carousel");

$(function() {
	//initLogosCarousel();
});

function initLogosCarousel() {

    var options = {
        items: 7,
        nav: false,
        navText: false,
        dots: false,
        loop: true,
        responsive : {
            0 : {
                items: 4
            },
            320: {
                items: 6
            },
            480: {
                items: 6
            },
            768: {
                items: 7
            }
        }
    };

    $logosCarousel.owlCarousel(options);
}