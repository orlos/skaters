/*LINKS*/

// VARS

var $link = $(".links").find(".owl-carousel");

$(function() {
	initLinks();
});

function initLinks() {

    var options = {
        items: 3,
        nav: false,
        navText: false,
        dots: false,
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
                items: 3
            }
        }
    };

    $link.owlCarousel(options);
}