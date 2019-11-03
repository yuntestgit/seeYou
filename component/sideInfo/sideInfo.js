(function() {
	var backBtn = document.querySelector('.sideInfo .backBtn');
	var homeBtn = document.querySelector('.sideInfo .homeBtn');
	
	backBtn.addEventListener('click', controller.patientInfo.back);
	homeBtn.addEventListener('click', controller.patientInfo.back);
})();