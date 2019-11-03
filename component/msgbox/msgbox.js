(function() {
	let msgbox = $('.msgbox');
	for (let i = 0; i < msgbox.length; i++) {
		//fadeIn
		function activeEvent() {
			//initialize
			if (!$(this).hasClass('show')) {
				$(this).addClass('show');
				$(this).fadeOut(0);
			}
			//animation
			$(this).fadeIn(500);
		}
		//fadeOut
		function closeEvent() {
			//animation
			$(this).fadeOut(400);
		}
		
		
		//啟動button click事件
		msgbox[i].activeEvent = activeEvent.bind(msgbox[i]);
		
		//右上角x button click事件
		let closeBtn = $(msgbox[i]).find('> .box > .close')[0];
		closeBtn.addEventListener('click', closeEvent.bind(msgbox[i]));
		
		//取消button click事件
		$(msgbox[i]).find('> .box > .operatingArea > button').each(function() {
			this.addEventListener('click', closeEvent.bind(msgbox[i]));
		});
	}
})();

(function() {
	//insertBar
	let msgbox_activeBtn = $('.insertBar > button');
	for (let i = 0; i < msgbox_activeBtn.length; i++) {
		msgbox_activeBtn[i].addEventListener('click', function() {
			var id = this.id;
			id = id.substr(3, id.length - 3);
			id = id.toLowerCase() + 'Msgbox';
			
			document.querySelector('#' + id).activeEvent();
		}.bind(msgbox_activeBtn[i]));
	}
})();