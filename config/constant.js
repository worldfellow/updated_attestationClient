var constants = {
	BASE_URL : "https://devmu.etranscript.in/api",
	//BASE_URL: 'http://mu.etranscript.in:5000',
	PORT : 5000,
	SYSTEM_TIMEZONE: 'Asia/Kolkata',
	//FILE_LOCATION:'/srv/www/attestation/',
	FILE_LOCATION:'/srv/www/Attestation_Server/',
	FILE_LOCATION_NEW : '/mnt/attestationDocuments/',
	TMP_FILE_UPLOAD_PATH: 'public/upload/tmp/',
    PDF_VIEW :'https://devmu.etranscript.in/api/',
    urlAuthString :'https://deveuploads.wes.org/api/v2/authenticate',
	urlFileUpload :'https://deveuploads.wes.org/api/v2/file',
	signedFileUrl : '/srv/www/Attestation_Server/public/signedpdf/',
	BASE_URL_SENDGRID :'http://localhost:60/',
	//NEW EMAIL Configurations
	SMTP_USERNAME: "",
	SMTP_PASSWORD: "",
	SEND_EMAIL_FROM: "",
	SEND_EMAIL_FROM_NAME: "University Of Mumbai",
	SENDGRID_API_KEY: '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',
	//SENDGRID_API_KEY: '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',
	ENV_sendgrid_Twilio: 'production',
	trudesk_BASE_URL : 'http://devsndt.admissiondesk.org:8118/',
	trudesk_key : '',
	MU_BASE_URL :  'https://devmu.admissiondesk.org:5000/',
	HOST : 'sftp22.WES.quatrix.it',
	QUSERNAME : '',
	QPASSWORD : '',
	SERVERPATH : '/MU/',
	VIEW_VERIFY_EMAIL: 'verify_email',
	CLOUDCONVERTKEY : '37ghbio4CcT3N7mdKAPQNIniRg78R8EkJEMn31UQ_t3u24Uty9ab0MMByNO4euNuPXhVoa3ItJY-Vz_A1kDuyw',
	PASSPHRASE : '',
	AWS_endpoint : 'https://eu2.contabostorage.com/muattestation',
	accessKeyId : 'f2ed09d787bc47cbb035b3e358dd0b49',
	secretAccessKey : '18407679424bcee60b6ce730eccba499',
	contaboFilePath : 'https://eu2.contabostorage.com/939798088aeb42df9fc88c6029e0c223:muattestation/'
}

module.exports = constants;
