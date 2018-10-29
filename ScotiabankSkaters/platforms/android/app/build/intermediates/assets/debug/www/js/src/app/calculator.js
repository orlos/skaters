/*CALCULATOR*/

$(function() {
	initCalculator();
});

function initCalculator() {

	$('.range-bar').on('input', function () {
		var $id = $(this).attr('id');
		var $num = $(this).val();
		var $wid = parseInt($(this).width());
		$('#' + $id + '-number').val($num);
		$('#' + $id + '-label').html($num);
		var $left = (($num * ($wid - 76)) / 500);
		$('#' + $id + '-label').css('left', $left + 'px');

		//console.log($wid);

		acum = 0;
		$('.range-bar').each(function() {
			acum += parseInt($(this).val());
		});

		$('#howMuchYouNeedSaveMonthly').html(acum);
		$('#totalAnualCosts').html(acum * 12);
	});

	$('.link-calculator-tooltip').click(function() {
		var $id = $(this).attr('id').split('-')[3];
		//console.log($id);
		$('#calculator-tooltip-' + $id).fadeToggle();
	});

	$('.calculator-tooltip').children('.close').click(function() {
		$(this).parent().fadeToggle();
	});

}