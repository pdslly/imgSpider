"use strict";

var http = require('http'),
	path = require('path'),
	colors = require('colors'),
	crypto = require('crypto'),
	fs = require('fs');

const downLoadImg = (url) => {

	const extName = url.split('.').pop();

	http.get(url, (res) => {
		res.setEncoding('binary');
		let data = '';

		console.log(res)

		/*res.on('data', (chunk) => {
			data += chunk;
		})

		res.on('end', (err) => {

			const name = crypto.createHmac('md5', url)
							   .digest('hex');
			const dir = path.resolve(__dirname, `./upload/${name}.${extName}`);

			if(err){
				console.log(err);
			}

			fs.writeFile(dir, data, 'binary', () => {
				console.log(`${url} downloaded!!!`);
			})
		})*/

	})

}

module.exports = downLoadImg;