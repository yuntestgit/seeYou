(function($) {
	let graphicData = [
		/* 背部角度 */ {
			graphicID: 'backAngle',
			graphicWidth: 275,
			graphicHeight: 180,
			fill: false,
			titleText: '背部角度(度)',
			xUnit: '點',
			yUnit: '度',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		/* 整床高度 */ {
			graphicID: 'bedHeight',
			graphicWidth: 275,
			graphicHeight: 180,
			fill: false,
			titleText: '整床高度(cm)',
			xUnit: '點',
			yUnit: 'cm',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		/* 腳部角度 */ {
			graphicID: 'footAngle',
			graphicWidth: 275,
			graphicHeight: 180,
			fill: false,
			titleText: '腳部角度(度)',
			xUnit: '點',
			yUnit: '度',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		
		/* 收縮壓 */ {
			graphicID: 'systolic',
			graphicWidth: 495,
			graphicHeight: 200,
			fill: false,
			titleText: '收縮壓',
			xUnit: '點',
			yUnit: 'mmHg',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		/* 舒張壓 */ {
			graphicID: 'diastolic',
			graphicWidth: 495,
			graphicHeight: 200,
			fill: false,
			titleText: '舒張壓',
			xUnit: '點',
			yUnit: 'mmHg',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		/* 血糖 */ {
			graphicID: 'bloodSugar',
			graphicWidth: 495,
			graphicHeight: 200,
			fill: false,
			titleText: '血糖',
			xUnit: '點',
			yUnit: 'mg/dl',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		},
		
		/* 體溫 */ {
			graphicID: 'temperature',
			graphicWidth: 500,
			graphicHeight: 200,
			fill: false,
			titleText: '體溫',
			xUnit: '點',
			yUnit: '°C',
			xScale: 2,
			yScale: 20,
			fontSize: 15
		}
		
	];
	
	for (let i = 0; i < graphicData.length; i++) {
		let chartdata = [];
		for (let i2 = 0; i2 <= 23; i2++) {
			chartdata.push({
				x: i2,
				y: $.rand(0, 100)
			});
		}
		
		let chart = new CanvasJS.Chart(graphicData[i].graphicID, {
			width: graphicData[i].graphicWidth,
			height: graphicData[i].graphicHeight,
			animationEnabled: true,
			colorSet: 'myColor',
			title: {
				text: graphicData[i].titleText,
				verticalAlign: 'bottom',
				horizontalAlign: 'center'
			},
			axisX: {
				labelFontSize: graphicData[i].fontSize,
				xValueFormatString: '#0',
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				// gridThickness: 1,
				interval: graphicData[i].xScale
			},
			axisY: {
				labelFontSize: graphicData[i].fontSize,
				yValueFormatString: '#0',
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				interval: graphicData[i].yScale
			},
			data: [
				{
					// type: 'area',
					type: graphicData[i].fill ? 'area' : 'line',
					xValueFormatString: '#0' + graphicData[i].xUnit,
					yValueFormatString: '#0' + graphicData[i].yUnit,
					dataPoints: chartdata
				}
			]
		});
		chart.render();
		
		updateChart();
		
		function updateChart() {
			chartdata.splice(0, 1);
			
			for (let i2 = 0; i2 < chartdata.length; i2++) {
				chartdata[i2].x -= 1;
			}
			chartdata.push({
				x: chartdata[chartdata.length - 1].x + 1,
				y: $.rand(0, 100)
			});
			chart.render();
			
			setTimeout(function() {
				updateChart();
			}, 1000);
		}
	}
})(yun);