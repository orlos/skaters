/*ACTIONS*/

$(function() {
	initActions();
});

function initActions() {

	$('.smaller').click(function() {
		var $aux = $(this).attr('id').split('-');
		var $id = $aux[1];
		var $videoSlug = $aux[2];
		$('.smaller').removeClass('active');
		$('#smaller-' + $id + '-' + $videoSlug).addClass('active');
		$('.bigger').removeClass('active');
		$('.bigger').html('');
		$('#bigger-' + $id + '-' + $videoSlug).addClass('active');
		$('#bigger-' + $id + '-' + $videoSlug).html('<iframe width="560" height="423" src="https://www.youtube.com/embed/' + $videoSlug + '?autoplay=1" frameborder="0"></iframe>');
	});
}