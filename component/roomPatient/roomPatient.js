(function() {
	function $$(_selector) {
		return document.querySelector ? document.querySelector(_selector) : null;
	}
	function $$$(_selector) {
		return document.querySelectorAll ? document.querySelectorAll(_selector) : [];
	}

	var rooms = $$$('.roomRow > .room');
	for (var i = 0; i < rooms.length; i++) {
		rooms[i].addEventListener(
			'click',
			function() {
				this.classList.toggle('active');
				var roomId = this.innerText;
				
				var rooms = $$$('.room');
				for (var i = 0; i < rooms.length; i++) {
					if (rooms[i] !== this) {
						rooms[i].classList.remove('active');
					}
				}
				
				var patientGroups = $$$('.patientGroup');
				for (var i = 0; i < patientGroups.length; i++) {
					patientGroups[i].classList.remove('active');
					if ($(patientGroups[i]).attr('data-roomId') === roomId) {
						if (this.classList.contains('active')) {
							patientGroups[i].classList.add('active');
						}
					}
				}
			}.bind(rooms[i])
		);
	}
	
	var patients = $$$('.patient');
	for (var i = 0; i < patients.length; i++) {
		patients[i].addEventListener('click', function() {
			controller.patientInfo.main();
		});
	}
})();
