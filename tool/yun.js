window.yun = (function() {
	'use strict';
	
	//#region [green]　		window[is　+　type]								#
	window.isExist = function(_something) {
		return _something !== undefined && _something !== null;
	};
	
	window.isArray = function(_something) {
		return Object.prototype.toString.call(_something) === '[object Array]';
	};
	
	window.isBoolean = function(_something) {
		return Object.prototype.toString.call(_something) === '[object Boolean]';
	};
	
	window.isFunction = function(_something) {
		return Object.prototype.toString.call(_something) === '[object Function]';
	};
	
	window.isNumber = function(_something) {
		return Object.prototype.toString.call(_something) === '[object Number]';
	};
	
	window.isObject = function(_something) {
		return Object.prototype.toString.call(_something) === '[object Object]';
	};
	
	window.isString = function(_something) {
		return Object.prototype.toString.call(_something) === '[object String]';
	};
	
	window.isInteger = function(_something) {
		return _something === +_something && _something === (_something | 0);
	};
	
	window.isFloat = function(_something) {
		return _something === +_something && _something !== (_something | 0);
	};
	//#endregion [green]
	
	var $ = { version: '1.0' };
	$.timer = /** @class */ function(_config) {
		//#region constructor
		_config = isExist(_config) ? _config : {};
		var __default = { interval: 1, tick: null };
		for (var key in __default) {
			if (!isExist(_config[key])) {
				_config[key] = __default[key];
			}
		}
		_config.enable = false;
		_config.recordedTime = 0;
		_config.lastTime = 0;
		_config.interval = parseInt(_config.interval);
		_config.interval = _config.interval >= 1 ? _config.interval : 1;
		_config.tick = isFunction(_config.tick) ? _config.tick : null;
		_config.me = this;
		//#endregion
		
		this.interval = function(_interval) {
			_interval = parseInt(_interval);
			_config.interval = _interval >= 1 ? _interval : _config.interval;
			return _config.interval;
		};
		
		this.tick = function(_tick) {
			_config.tick = isFunction(_tick) ? _tick : null;
		};
		
		_config.counter = function() {
			if (_config.enable) {
				if (_config.tick) {
					_config.tick.call(_config.me);
				}
				setTimeout(_config.counter, _config.interval);
			}
		};
		
		this.start = function(_delay) {
			if (_config.enable === false) {
				if (isExist(_delay)) {
					_delay = parseInt(_delay);
					if (_delay < 0) {
						_delay = 0;
					}
				} else {
					_delay = 0;
				}
				var date = new Date();
				_config.lastTime = date.getTime();
				_config.enable = true;
				setTimeout(_config.counter, _delay);
			}
		};
		
		this.stop = function() {
			_config.enable = false;
			var date = new Date();
			_config.recordedTime += date.getTime() - _config.lastTime;
		};
		
		this.toggle = function(_delay) {
			if (_config.enable) {
				this.stop();
			} else {
				this.start(_delay);
			}
		};
		
		this.getTime = function() {
			var date = new Date();
			return date.getTime();
		};
		
		this.timeElapsed = {
			total: function() {
				if (_config.enable) {
					var date = new Date();
					return date.getTime() - _config.lastTime + _config.recordedTime;
				} else {
					return _config.recordedTime;
				}
			},
			
			current: function() {
				if (_config.enable) {
					var date = new Date();
					return date.getTime() - _config.lastTime;
				} else {
					return 0;
				}
			},
			
			reset: function() {
				_config.recordedTime = 0;
			}
		};
	};
	
	$.ajax = function(_config) {
		_config = isExist(_config) ? _config : {};
		var __default = {
			method: 'get',
			url: '',
			arg: '',
			success: null,
			timeout: null,
			timeoutResponse: null,
			failure: null,
			async: true
		};
		for (var key in __default) {
			if (!isExist(_config[key])) {
				_config[key] = __default[key];
			}
		}
		_config.method = _config.method.toLowerCase();
		_config.arg = encodeURI(_config.arg);
		_config.timesup = false;
		
		//#region XMLHttpRequest
		var httpRequest;
		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType) {
				httpRequest.overrideMimeType('text/xml');
			}
		} else if (window.ActiveXObject) {
			try {
				httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {}
			}
		}
		//#endregion
		
		if (_config.timeout) {
			_config.timer = new $.timer({
				interval: 1000,
				tick: function() {
					if (this.timeElapsed.current() >= _config.timeout) {
						this.stop();
						_config.timesup = true;
						if (isFunction(_config.timeoutResponse)) {
							_config.timeoutResponse.call(null);
						}
					}
				}
			});
		}
		httpRequest.onreadystatechange = function() {
			if (!_config.timesup) {
				if (httpRequest.readyState == 4) {
					if (_config.timeout) {
						_config.timer.stop();
					}
					if (httpRequest.status == 200) {
						if (isFunction(_config.success)) {
							_config.success.call(httpRequest, httpRequest.responseText);
						}
					} else {
						if (isFunction(_config.failure)) {
							_config.failure.call(httpRequest, httpRequest.status);
						}
					}
				}
			}
		};
		if (_config.timeout) {
			_config.timer.start();
		}
		if (_config.method === 'get') {
			httpRequest.open('get', _config.url + '?' + _config.arg, _config.async);
			httpRequest.send();
		} /** @post */ else {
			httpRequest.open('post', _config.url, _config.async);
			httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			httpRequest.send(_config.arg);
		}
	};
	
	$.url = function(_json) {
		var arr = [];
		for (var key in _json) {
			arr.push(key + '=' + _json[key]);
		}
		var result = arr.join('&');
		return result;
	};
	
	$.rand = function(min, max) {
		return Math.random() * (max - min) + min;
	};
	return $;
})();