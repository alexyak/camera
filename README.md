# Module: Camera
The `camera` module allows you to display a webcamera video feed on your MagicMirror. The webcamera needs to be connected to the Raspberry Pi via USB. 
This module also allows you to make "selfie" photo snapshots with the camera and send them via specified email account.


## Using the module

To use `camera` module, add it to the modules array in the `config/config.js` file with the following settings:
````javascript

modules: [
    module: 'camera',
    position: 'top_center',
    config: selfieInterval: 3,  // Time interval in seconds before the photo will be taken.
		emailConfig: {
			service: 'Hotmail', // Email provider to use to send email with a photo.
			auth: {
				user: '<name@email.com>', // Your email account
				pass: '<password>'        // Your password for email account
			}
		}
]

````

Here is a list of the supported Email providers:

Service names are case insensitive

* **'1und1'**
* **'AOL'**
* **'DebugMail.io'**
* **'DynectEmail'**
* **'FastMail'**
* **'GandiMail'**
* **'Gmail'**
* **'Godaddy'**
* **'GodaddyAsia'**
* **'GodaddyEurope'**
* **'hot.ee'**
* **'Hotmail'**
* **'iCloud'**
* **'mail.ee'**
* **'Mail.ru'**
* **'Mailgun'**
* **'Mailjet'**
* **'Mandrill'**
* **'Naver'**
* **'OpenMailBox'**
* **'Postmark'**
* **'QQ'**
* **'QQex'**
* **'SendCloud'**
* **'SendGrid'**
* **'SES'**
* **'SES-US-EAST-1'**
* **'SES-US-WEST-2'**
* **'SES-EU-WEST-1'**
* **'Sparkpost'**
* **'Yahoo'**
* **'Yandex'**
* **'Zoho'**

> To use Gmail you may need to configure ["Allow Less Secure Apps"](https://www.google.com/settings/security/lesssecureapps) in your Gmail account unless you are using 2FA in which case you would have to create an [Application Specific](https://security.google.com/settings/security/apppasswords) password. You also may need to unlock your account with ["Allow access to your Google account"](https://accounts.google.com/DisplayUnlockCaptcha) to use SMTP.

The `camera` module is using the [nodemailer](https://github.com/nodemailer/nodemailer) to send email, so please refer to its original documentation if you have any problems.

The `camera` module works together with the [Voice Control module](https://github.com/alexyak/voicecontrol) which you will also need to install on your mirror.

The `camera` module will be reacting on the notification messages that are send from the `voice control` module to show/hide camera or make a snapshot. 

In order to enable this functionality you will need to create a trained model for each command/keyword at [snowboy.kitt.ai](https://snowboy.kitt.ai/). In particular you will need to create models for `Show Camera', 'Hide Camera' and 'Selfie'.

Download the gerenated models and copy them into the root of the MagicMirror directory. 




## Setup

* Clone the module into your `modules` folder in the MagicMirror's code location by running this command:

````
git clone https://github.com/alexyak/camera.git
````

* Navigate to the camera sub folder: ```` cd camera ```` and run the following command to install node.js dependencies:

````
npm install
````

* If you have not already done so install the [Voice Control module](https://github.com/alexyak/voicecontrol) by running the following command in the `modules' folder:

````
git clone https://github.com/alexyak/voicecontrol.git
````

Check the README.md for the Voice Control module to configure it for the MagicMirror.

* In order to use the generated models mentioned above, update the configuration section for the `voicecontrol` module to look like this:

````
{
	module: 'voicecontrol',
	position: 'bottom_left',
	config: {
		models: [
			{
				keyword: "Show Camera",
				description: "Say 'Show Camera' to display camera",
				file: "showCamera.pmdl",
				message: "SHOW_CAMERA"
			},
			{
				keyword: "Hide Camera",
				description: "Say 'Hide Camera' to hide camera",
				file: "hideCamera.pmdl",
				message: "HIDE_CAMERA"
			},
			{
				keyword: "Selfie",
				description: "Say 'Selfie' when camera is visible",
				file: "selfie.pmdl",
				message: "SELFIE"
			},
		]
	}
}
````
