// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl :'http://localhost:5000/api',
  transUploadUrl:"https://devmu.etranscript.in/api/student/upload_transcript",
  NameChangeLetterUrl:"https://devmu.etranscript.in/api/student/upload_letterforNameChange",
  markListUploadUrl : "https://devmu.etranscript.in/api/student/uploadUserMarkList",
  curriculumUploadUrl: "https://devmu.etranscript.in/api/student/upload_curriculum",
  migrationUploadUrl :"https://devmu.etranscript.in/api/student/upload_migration",
 letterUploadUrl: "https://devmu.etranscript.in/api/student/upload_gradeToPercentLetter",
 CompetencyletterUploadUrl :"http://localhost:5000/api/student/upload_CompetencyLetter",
 PaymentIssueUrl :"https://devmu.etranscript.in/api/student/Upload_PaymentIssueUrl",
 WesLetterUrl :"https://devmu.etranscript.in/api/student/WesLetterUrl",
 migrationurl :'',
 verificationurl :'',
 convactionurl :'',
 pdcurl : ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
