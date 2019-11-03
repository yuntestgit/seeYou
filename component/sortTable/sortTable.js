(function() {
	let sortTable = $('.sortTable');
	for (let i = 0; i < sortTable.length; i++) {
		$(sortTable[i])
			.find('> thead > tr > th')
			.each(function(col) {
				if ($(this).text() !== '') {
					$(this).click(function() {
						if ($(this).hasClass('asc')) {
							$(this).removeClass('asc');
							$(this).addClass('desc');
							sortOrder = -1;
						} else {
							$(this).addClass('asc');
							$(this).removeClass('desc');
							sortOrder = 1;
						}
						$(this)
							.siblings()
							.removeClass('asc');
						$(this)
							.siblings()
							.removeClass('desc');
						let arrData = $(sortTable[i])
							.find('> tbody > tr:has(td)')
							.get();
						arrData.sort(function(a, b) {
							let val1 = $(a)
								.children('td')
								.eq(col)
								.text()
								.toUpperCase();
							let val2 = $(b)
								.children('td')
								.eq(col)
								.text()
								.toUpperCase();
							if ($.isNumeric(val1) && $.isNumeric(val2)) {
								return sortOrder == 1 ? val1 - val2 : val2 - val1;
							} else {
								return val1 < val2 ? -sortOrder : val1 > val2 ? sortOrder : 0;
							}
						});
						$.each(arrData, function(index, row) {
							$(sortTable[i])
								.find('> tbody')
								.append(row);
						});
					});
				}
			});
	}
})();
