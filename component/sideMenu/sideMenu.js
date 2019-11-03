(function($) {
	const multipleExpand = false; //允許 siblings ul 展開
	
	var sideMenu_title = $('.sideMenu > .title');
	for (var i = 0; i < sideMenu_title.length; i++) {
		//檢查expanded class，設定摺疊狀態
		var sideMenu = sideMenu_title[i].parentNode;
		if ($(sideMenu).hasClass('expanded')) {
			$(sideMenu)
				.children()
				.eq(1)
				.slideDown(0);
		} else {
			$(sideMenu)
				.children()
				.eq(1)
				.slideUp(0);
		}
		
		//註冊click事件
		sideMenu_title[i].addEventListener(
			'click',
			function() {
				$(this)
					.parent()
					.toggleClass('expanded');
				$(this)
					.next()
					.slideToggle(400);
					
				if (!multipleExpand) {
					if (
						$(this)
							.parent()
							.hasClass('expanded')
					) {
						$(this)
							.parent()
							.siblings()
							.removeClass('expanded');
						$(this)
							.parent()
							.siblings()
							.each(function() {
								$(this)
									.children()
									.eq(1)
									.slideUp(400);
							});
					}
				}
			}.bind(sideMenu_title[i])
		);
	}
})(jQuery);

(function() {
	var li_links = document.querySelectorAll('.sideMenu .link');
	for (var i = 0; i < li_links.length; i++) {
		li_links[i].addEventListener('click', controller.patientInfo.main);
	}
})();