const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});

module.exports = {
  sendEmail: function(options, callback){
    let error = new Error();

    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        secure: options.secure, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: options.sender, // sender address
        to: options.receiver, // list of receivers
        subject: options.subject
      };

      if(options.hasOwnProperty("text")) {
        mailOptions.text = options.text; // plain text body
      } else {
        mailOptions.html = options.html; // html body
      }
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
    });
  },
  getEmailDataFromConfig: function(){
    return {
      host: sails.config.smtp.host,
      port: sails.config.smtp.port,
      secure: sails.config.smtp.secure,
      user:sails.config.smtp.username,
      pass:sails.config.smtp.password,
      sender: sails.config.smtp.operatorEmail,
      subject: 'Snappy test',
      html: 'Hello world!'
    };
  }
};
