//#region html structure

// var left = {
// 	scrollbar: {
// 		track,
// 		slider
// 	},

// 	scrollbarRange: {},

// 	scrollbarValue: {}
// };

//#endregion

(function() /* movableItem drag */ {
	function $(_selector) {
		return document.querySelectorAll(_selector);
	}

	function getStyle(_target, _property) {
		return window.getComputedStyle ? getComputedStyle(_target).getPropertyValue(_property) : _target.currentStyle[_property];
	}

	let movableItems = $('.movableRange > .movableItem');
	for (let i = 0; i < movableItems.length; i++) {
		movableItems[i].addEventListener('mousedown', onMouseDown.bind(movableItems[i]));
	}

	function onMouseDown() {
		const e = arguments[0];

		this.positionX = parseInt(getStyle(this, 'left'));
		this.positionY = parseInt(getStyle(this, 'top'));
		this.startX = e.clientX;
		this.startY = e.clientY;

		this.onMouseMove = onMouseMove.bind(this);
		this.onMouseUp = onMouseUp.bind(this);
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
		document.onselectstart = function() {
			return false;
		};
	}

	function onMouseMove() {
		if (this.onMouseMove) {
			const e = arguments[0];
			const parent = this.parentNode;

			var directionX = this.classList.contains('direction-x');
			var directionY = this.classList.contains('direction-y');
			var directionBoth = this.classList.contains('direction-both') || (directionY || directionX) === false;

			var limitX = this.classList.contains('limit-x');
			var limitY = this.classList.contains('limit-y');
			var limitBoth = this.classList.contains('limit-both') || (limitY || limitX) === false;

			var targetTop = e.clientY - this.startY + this.positionY;
			var targetLeft = e.clientX - this.startX + this.positionX;

			if (/* 計算在容器內的Y座標 */ limitBoth || limitY) {
				targetTop =
					targetTop + parseInt(getStyle(this, 'height')) < parseInt(getStyle(parent, 'height'))
						? targetTop
						: parseInt(getStyle(parent, 'height')) - parseInt(getStyle(this, 'height'));
				targetTop = targetTop > 0 ? targetTop : 0;
			}

			if (/* 計算在容器內的X座標 */ limitBoth || limitX) {
				targetLeft =
					targetLeft + parseInt(getStyle(this, 'width')) < parseInt(getStyle(parent, 'width'))
						? targetLeft
						: parseInt(getStyle(parent, 'width')) - parseInt(getStyle(this, 'width'));
				targetLeft = targetLeft > 0 ? targetLeft : 0;
			}

			if (/* 設定Y座標 */ directionBoth || directionY) {
				this.style.top = targetTop + 'px';
			}

			if (/* 設定X座標 */ directionBoth || directionX) {
				this.style.left = targetLeft + 'px';
			}
		}
	}

	function onMouseUp() {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
		this.onMouseMove = null;
		document.onselectstart = function() {};
	}
})();

(function() /* track.onclick => slider.move */ {
	function $(_selector) {
		return document.querySelectorAll(_selector);
	}

	function getStyle(_target, _property) {
		return window.getComputedStyle ? getComputedStyle(_target).getPropertyValue(_property) : _target.currentStyle[_property];
	}

	let scrollbars = $('.scrollbar');
	for (let i = 0; i < scrollbars.length; i++) {
		scrollbars[i].locate = function() {
			const e = arguments[0];

			if (e.target.classList.contains('scrollbar') || e.target.classList.contains('track')) {
				let slider = this.querySelector('.slider');

				var targetLeft = e.offsetX;
				targetLeft = targetLeft - parseInt(getStyle(slider, 'width')) / 2;

				if (targetLeft < 0) {
					targetLeft = 0;
				}

				var range = parseInt(getStyle(this, 'width')) - parseInt(getStyle(slider, 'width'));
				if (targetLeft > range) {
					targetLeft = range;
				}

				slider.style.left = targetLeft + 'px';
			}
		};
		scrollbars[i].addEventListener('click', scrollbars[i].locate.bind(scrollbars[i]));
	}
})();

(function() /* scrollbar <bind> data */ {
	function $(_selector) {
		return document.querySelectorAll(_selector);
	}

	function getStyle(_target, _property) {
		return window.getComputedStyle ? getComputedStyle(_target).getPropertyValue(_property) : _target.currentStyle[_property];
	}

	let scrollItem_left = $('.scrollItem > .left');
	for (let i = 0; i < scrollItem_left.length; i++) {
		let scrollbar = scrollItem_left[i].querySelector('.scrollbar');

		let scrollbarRange = scrollItem_left[i].querySelector('.scrollbarRange');
		let min = scrollbarRange.querySelector('.min');
		let max = scrollbarRange.querySelector('.max');

		let scrollbarValue = scrollItem_left[i].querySelector('.scrollbarValue');

		let minValue = parseInt(min.innerText);
		let maxValue = parseInt(max.innerText);
		let value = parseInt(scrollbarValue.innerText);

		if (value > maxValue) {
			value = maxValue;
		}
		if (value < minValue) {
			value = minValue;
		}

		var percentage = value / maxValue;

		var width = parseInt(getStyle(scrollbar, 'width'));
		var targetLeft = width * percentage;

		let slider = scrollbar.querySelector('.slider');

		targetLeft = targetLeft - parseInt(getStyle(slider, 'width')) / 2;

		if (targetLeft < 0) {
			targetLeft = 0;
		}

		var range = parseInt(getStyle(scrollbar, 'width')) - parseInt(getStyle(slider, 'width'));
		if (targetLeft > range) {
			targetLeft = range;
		}

		slider.style.left = targetLeft + 'px';

		//listen for slider.style attribute change
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.attributeName === 'style') {
					scrollbar_updateValue.call(scrollItem_left[i]);
				}
			});
		});
		var observerConfig = {
			attributes: true,
			attributeFilter: ['style']
		};
		observer.observe(slider, observerConfig);
	}

	/** @this .scrollItem>.left */
	function scrollbar_updateValue() {
		let scrollbar = this.querySelector('.scrollbar');
		let scrollbarRange = this.querySelector('.scrollbarRange');
		let max = scrollbarRange.querySelector('.max');
		let scrollbarValue = this.querySelector('.scrollbarValue');
		let slider = scrollbar.querySelector('.slider');

		let styleLeft = parseInt(getStyle(slider, 'left'));
		let percentage = styleLeft / (parseInt(getStyle(scrollbar, 'width')) - parseInt(getStyle(slider, 'width')));
		let maxValue = parseInt(max.innerText);

		let value = parseInt(percentage * maxValue);
		scrollbarValue.innerText = value;
	}
})();