(function() {
	function $(_selector) {
		return document.querySelector ? document.querySelector(_selector) : null;
	}
	
	function $$(_selector) {
		return document.querySelectorAll ? document.querySelectorAll(_selector) : [];
	}
	
	function trapezoidNavbarOnclick() {
		var items = this.parentNode.querySelectorAll('.item');
		var link = ['electricBed', 'sleepingTape', 'blood', 'info', 'insideDevice'];
		//Container
		for (var i = 0; i < items.length; i++) {
			if (items[i].parentNode === this.parentNode) {
				if (items[i] === this) {
					this.classList.add('active');
					$('.' + link[i] + 'Container').classList.remove('hide');
				} else {
					items[i].classList.remove('active');
					$('.' + link[i] + 'Container').classList.add('hide');
				}
			}
		}
	}
	
	var trapezoidNavbar = $$('.trapezoidNavbar');
	for (var i = 0; i < trapezoidNavbar.length; i++) {
		var items = trapezoidNavbar[i].querySelectorAll('.item');
		for (var i2 = 0; i2 < items.length; i2++) {
			if (items[i2].parentNode === trapezoidNavbar[i]) {
				var eventHandler = trapezoidNavbarOnclick.bind(items[i2]);
				items[i2].addEventListener('click', eventHandler);
			}
		}
	}
})();