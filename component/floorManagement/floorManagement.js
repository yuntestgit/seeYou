(function() {
	$('.floorOperating .addRoom').each(function() {
		this.addEventListener('click', function() {
			$('#roomMsgbox')[0].activeEvent();
		});
	});
})();