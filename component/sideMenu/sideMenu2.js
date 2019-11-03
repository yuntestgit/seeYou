(function() {
	let link_li = $('.sideMenuContainer2 [data-link$="Management"]');
	for (let i = 0; i < link_li.length; i++) {
		link_li[i].addEventListener('click', function() {
			for (let i2 = 0; i2 < link_li.length; i2++) {
				if (link_li[i2].tagName.toLowerCase() === 'li') {
					var title = $(link_li[i2])
						.parent()
						.siblings();
					$(title).removeClass('active');
				}
				$(link_li[i2]).removeClass('active');
			}
			
			if (link_li[i].tagName.toLowerCase() === 'li') {
				var title = $(link_li[i])
					.parent()
					.siblings();
				$(title).addClass('active');
			}
			$(link_li[i]).addClass('active');
			
			var container = [
				'flooarManagement',
				'deviceManagement',
				'alarmManagement',
				'userManagement',
				'groupManagement',
				'accountManagement'
			];
			
			for (var i3 = 0; i3 < container.length; i3++) {
				if (container[i3] === $(link_li[i]).attr('data-link')) {
					$('.' + container[i3]).removeClass('hide');
				} else {
					$('.' + container[i3]).addClass('hide');
				}
			}
		});
	}
})();