var $config = {
	url: 'http://127.0.0.1:3000'
};

var controller = {
	patientInfo: {
		main: function() {
			//patient page
			document.querySelector('.borderButtonContainer').classList.add('hide');
			document.querySelector('.roomPatientContainer').classList.add('hide');
			document.querySelector('.trapezoidNavbar').classList.remove('hide');
			
			document.querySelector('.sideMenuContainer').classList.add('hide');
			document.querySelector('.sideInfoContainer').classList.remove('hide');
		},
		
		back: function() {
			var trapezoidNavbar_items = document.querySelectorAll('.trapezoidNavbar .item');
			var link = ['electricBed', 'sleepingTape', 'blood', 'info', 'insideDevice'];
			for (var i = 0; i < trapezoidNavbar_items.length; i++) {
				trapezoidNavbar_items[i].classList.remove('active');
				document.querySelector('.' + link[i] + 'Container').classList.add('hide');
			}
			
			document.querySelector('.borderButtonContainer').classList.remove('hide');
			document.querySelector('.roomPatientContainer').classList.remove('hide');
			document.querySelector('.trapezoidNavbar').classList.add('hide');
			
			document.querySelector('.sideMenuContainer').classList.remove('hide');
			document.querySelector('.sideInfoContainer').classList.add('hide');
		},
		
		home: function() {
			
		},
		
		setting: function() {
			var homePage = document.querySelectorAll('.homePage');
			for (var i = 0; i < homePage.length; i++) {
				homePage[i].classList.add('hide');
			}
			
			var settingPage = document.querySelectorAll('.settingPage');
			for (var i = 0; i < settingPage.length; i++) {
				settingPage[i].classList.remove('hide');
			}
		},
		
		settingBack: function() {
			var settingPage = document.querySelectorAll('.settingPage');
			for (var i = 0; i < settingPage.length; i++) {
				settingPage[i].classList.add('hide');
			}
			
			var homePage = document.querySelectorAll('.homePage');
			for (var i = 0; i < homePage.length; i++) {
				homePage[i].classList.remove('hide');
			}

		},
	}
};

(function() {
	CanvasJS.addColorSet('myColor', ['#e17f10']);
})();

(function() /* for test */ {
	$('#user_id').val('test');
	$('#user_password').val('test');
})();