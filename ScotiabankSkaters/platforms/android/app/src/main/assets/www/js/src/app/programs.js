/*PROGRAMS*/

// VARS
var $programsCarousel = $(".programs").find(".owl-carousel");

$(function() {
	initProgramsCarousel();
});

function initProgramsCarousel() {

    var options = {
        items: 4,
        nav: true,
        navText: false,
        loop: true,
        autoHeight: true,
        responsive : {
            0 : {
                items: 2,
                nav: false,
                dots: true
            },
            480 : {
                items: 2,
                nav: false,
                dots: true
            },
            768: {
                items: 4,
                nav: true,
                dots: false
            }
        }
    };

    $programsCarousel.owlCarousel(options);
}