(function() {
	function $(_selector) {
		return document.querySelectorAll ? document.querySelectorAll(_selector) : [];
	}

	let trapezoidSwitch = $('.trapezoidSwitch');
	for (let i = 0; i < trapezoidSwitch.length; i++) {
		trapezoidSwitch[i].addEventListener(
			'click',
			function() {
				this.classList.toggle('on');
			}.bind(trapezoidSwitch[i])
		);
	}
})();
