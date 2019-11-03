(function($) {
	$('#loginoutBtn')[0].addEventListener('click', function() {
		$('#login_page').removeClass('hide');
		$('.wrapper').addClass('hide');
	});
	
	$('#settingBtn')[0].addEventListener('click', function() {
		controller.patientInfo.setting();
	});
	
	$('#backIconBtn')[0].addEventListener('click', function() {
		controller.patientInfo.settingBack();
	});
})(jQuery);