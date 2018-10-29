/*ACTIONS*/

$(function() {
	initFlipGive();
});

function initFlipGive() {

	$('.fgvideo').click(function() {
		$(this).removeClass('covered');
		var $videoSlug = $(this).data('youtube');
		$(this).html('<iframe width="560" height="423" src="https://www.youtube.com/embed/' + $videoSlug + '?autoplay=1" frameborder="0"></iframe>');
	});
}