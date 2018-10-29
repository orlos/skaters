/*TEAMMATES*/

var $carouselTeammates = $("#teammates").find(".owl-carousel");

$(function() {
	initCarouselTeammates();
	initTeammates();
});

function initTeammates() {

	$(document).on('click', '.small', function() {
		var $id = $(this).data('id');
		$('.small').removeClass('active');
		$('#small-' + $id).addClass('active');
		$('.big').removeClass('active');
		$('.big-' + $id).addClass('active');

        var $parent = $(this).parent();

        var $index = $("#teammates").find('.owl-item.active').index($parent);

        console.log($index);

		$carouselTeammates.trigger('next.owl.carousel');
        if($index > 0) $carouselTeammates.trigger('next.owl.carousel');
        if($index > 1) $carouselTeammates.trigger('next.owl.carousel');
        if($index > 2) $carouselTeammates.trigger('next.owl.carousel');
	});
}

function initCarouselTeammates() {

    var options = {
        items: 4,
        nav: true,
        navText: false,
        loop: true,
        dots: false,
        touchDrag: false,
        mouseDrag: false,
        responsive : {
            0 : {
                items: 2
            },
            768: {
                items: 4
            }
        }
    };

    $carouselTeammates.owlCarousel(options);
}