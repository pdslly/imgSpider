var http = require('http'),
	path = require('path'),
	colors = require('colors'),
	down = require('./download'),
	cp = require('child_process'),
	fs = require('fs');

require('events').EventEmitter.prototype._maxListeners = 1000;
const key = '比基尼';
const keyword = `%e5%a3%81%e7%ba%b8%20%${encodeURIComponent(key)}`;
const url = `http://image.baidu.com/search/index?ct=201326592&z=&tn=baiduimage&ipn=r&word=${keyword}&pn=0&istype=2&ie=utf-8&oe=utf-8&cl=2&lm=-1&st=-1&fr=&fmq=1483780178394_R&ic=0&se=&sme=&width=&height=&face=0`;

http.get(url, function(res){
	res.setEncoding('utf-8');

	var html = '';
	res.on('data', function(chunk){
		html += chunk;
	})

	res.on('end', function(err){
		var patt = new RegExp('\"objURL\"\:\"(.*?)\"', 'g');
		var patt2 = /http[^"]*/;
		var result = html.match(patt);

		if(err){
			console.log(err);
		}

		if(result.length > 0){
			result.forEach((item, index) => {


				const foo = cp.fork(`${__dirname}/foo.js`);

				foo.on('message', (m) => {
					console.log(m.res);
					foo.disconnect();
				});

				foo.send({url: item.match(patt2)[0]});

			})
		}
		
	})
})