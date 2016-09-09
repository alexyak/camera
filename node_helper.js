/**
 * Created by alexyak on 8/1/16.
 * node_helper for camera module
 */
var NodeHelper = require('node_helper');
var nodemailer = require('nodemailer');

module.exports = NodeHelper.create({

        transporter: null,
        
        start: function(){
            console.log(this.name + ' helper started ...');
        },

        socketNotificationReceived : function(notification, payload){
            if (notification === 'INIT_MAILER'){
                console.log('initializing nodemailer');
                this.config = payload;
                var self = this;
                this.transporter = nodemailer.createTransport({
                    service: self.config.emailConfig.service,
                    auth: {
                        user: self.config.emailConfig.auth.user,
                        pass: self.config.emailConfig.auth.pass
                    },
                    logger: true, // log to console
                    debug: true // include SMTP traffic in the logs
                });
            }
            else if  (notification === 'SEND_EMAIL') {
                this.config = payload.config;
                
                var message = {
                    from: 'magicmirror@example.com',
                    to: this.config.emailConfig.auth.user,
                    subject: 'Selfie from Magic Mirror',
                    attachments: [
                        {
                            path: payload.dataUrl
                        }
                    ]
                }

                this.transporter.sendMail(message, function (error, info) {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return;
                    }
                    console.log('Message sent successfully!');
                    console.log('Server responded with "%s"', info.response);
                });
            }
        }
});

