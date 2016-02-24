'use strict';
var nodemailer = require('nodemailer');

exports.contact = function(req, res){
    res.render('contact',
    { title: 'HearYe - Contact', page: 'contact' })
    var data = req.body;
};

/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(req, res) {
    var data = req.body;
    var transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@sandbox2ddcbdc349b645a1a884a89b60756a08.mailgun.org',
        pass: '9de0e45b9d135bdabbaf263cb47d70fd'
      }
    });

    transporter.sendMail({
        from: data.email,
        to: 'info@hearye.io',
        subject: 'Message from ' + data.name,
        text: data.message
    });
    res.redirect('/thankyou');
};
