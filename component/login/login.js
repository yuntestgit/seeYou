(function($, $$) {
	const backEnd = false; //設定是否後端驗證
	
	var login_button = document.querySelector('#login_button');
	login_button.addEventListener('click', function() {
		let data = {
			target: 'login',
			user_id: document.querySelector('#user_id').value,
			user_password: document.querySelector('#user_password').value
		};
		
		function login_success() {
			$('#login_page').addClass('hide');
			$('.wrapper').removeClass('hide');
			document.documentElement.classList.remove('loading');
			
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}
		
		function login_fail() {
			let msgbox = $('#login_fail')[0];
			msgbox.activeEvent();
		}
		
		if (/** @後端驗證 */ backEnd) {
			$$.ajax({
				method: 'post',
				url: $config.url,
				arg: $$.url(data),
				success: function(res) {
					if (res !== '' && res === data.user_id) {
						login_success();
					} else {
						login_fail();
					}
				},
				timeout: 10000, //ms
				timeoutResponse: login_fail,
				failure: login_fail,
				async: true
			});
		} /** @前端測試驗證 */ else {
			if (data.user_id === 'test' && data.user_password === 'test') {
				login_success();
			} else {
				login_fail();
			}
		}
	});
})(jQuery, yun);