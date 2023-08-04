var nodemailer = require('nodemailer');
var fs = require('fs');
var jade = require('jade');
var constants = require('./constant');

var SendMail = function (to, subject, template, content){
	this.to = to;
	this.subject = subject;
	this.template = template;
	this.content = content;
};

var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: constants.SMTP_USERNAME,
      	pass: constants.SMTP_PASSWORD
	},
	secure: true
});

SendMail.prototype.send = function (callback){
	
	var template = process.cwd() + '/views/' + this.template + '.jade';
	var content = this.content;
	var to = this.to;
	var subject = this.subject;

	fs.readFile(template, 'utf8', function (err, file){
		if(err) return callback (err);

		var fn = jade.compile(file);
	    var html = fn(content);

		var mailOptions = {
			from: constants.SEND_EMAIL_FROM,
			to: to,
			subject: subject,
			html: html
		};
		transporter.sendMail(mailOptions, function (err, info){
			// If a problem occurs, return callback with the error
			if(err) return callback(err);
			//console.log(info);
			callback();
		});
	});
};

module.exports = SendMail;