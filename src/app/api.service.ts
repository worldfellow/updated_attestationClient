import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable, Subscriber } from 'rxjs';
import { config } from 'config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = config.serverUrl;
  constructor(
    private httpClient: HttpClient,
  ) { }

  private handleError(error: any) {
    console.error(error);
  }

  get(url: string): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      var objectUrl: string;
      this.httpClient
        .get(url, {
          responseType: 'blob'
        })
        .subscribe(m => {
          objectUrl = URL.createObjectURL(m);
          observer.next(objectUrl);
        });

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    });
  }

  // login(email: any, password: any) {
  //   console.log("Called In API");
  //   return this.httpClient.post(`${this.baseUrl}/api/auth/login`, { "email": email, "password": password });
  // }

  RegisterValues(data: any) {
    console.log("REGISTERRRRR");
    return this.httpClient.post(`${this.baseUrl}/api/auth/register`, { data: data });
  }

  ForgotPassword(email: any) {
    console.log("FORGOTTTT");
    return this.httpClient.post(`${this.baseUrl}/ai/auth/forgot-password`, { data: email })
  }

  getCaptcha() {
    console.log("CAPTCHAAAA");
    return this.httpClient.get(`${this.baseUrl}/api/auth/captcha`);
  }

  Otpvalue(data: any) {
    console.log("OTP");
    return this.httpClient.post(`${this.baseUrl}/api/auth/verify-otp-reg`, { data: data });
  }

  UpdateNumberOTP(data: any) {
    console.log("RESEND OTP");
    return this.httpClient.post(`${this.baseUrl}/api/auth/resend-otp`, { data: data });
  }

  getMenuRole(userID: any) {
    return this.httpClient.get(`${this.baseUrl}/api/admin/role_management/getMenuRole?userID=` + userID);
  }

  checkapplications() {
    return this.httpClient.get(`${this.baseUrl}/api/attestation/checkapplications`);
  }

  getpreAppldetails() {
    return this.httpClient.get(`${this.baseUrl}/api/dashboard/getpreAppldetails`);
  }

  //new api's========================================================================================================================================================

  addUserEducationalDetails(formdata: any, user_id: any) {
    return this.httpClient.post(`${this.baseUrl}/api/student/educationalDetails`, { "formdata": formdata, "user_id": user_id });
  }

  getPurposeList(purposeList: any, purpose_name: any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getPurposeList?purposeList=${purposeList}&purpose_name=${purpose_name}`);
  }

  updateAllInstitute(type: any, refNo: any, wesEmail: any, wesName: any, wesSurname: any, universityCompanyName: any, name: any, countryName: any, contactPersonName: any, contactNo: any, emails: any, user_type: any, user_id: any, app_id: any, institute_id: any, function_type: any) {
    return this.httpClient.post(`${this.baseUrl}/api/student/updateAllInstitute`, { "type": type, "refNo": refNo, "wesEmail": wesEmail, "wesName": wesName, "wesSurname": wesSurname, "universityCompanyName": universityCompanyName, "name": name, "countryName": countryName, "contactPersonName": contactPersonName, "contactNo": contactNo, "emails": emails, "user_type": user_type, "user_id": user_id, "app_id": app_id, "institute_id": institute_id, "function_type": function_type });
  }

  deleteInstituteHrd(institute_id: any, purpose_name: any, user_id: any) {
    return this.httpClient.post(`${this.baseUrl}/api/student/deleteInstituteHrd`, { "institute_id": institute_id, "purpose_name": purpose_name, "user_id": user_id });
  }

  getInstituteData(app_id: any, purpose_name: any, user_type: any, user_id: any, institute_id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getInstituteData?app_id=${app_id}&purpose_name=${purpose_name}&user_type=${user_type}&user_id=${user_id}&institute_id=${institute_id}`);
  }

  getAppliedDetails(app_id: any, user_type: any, user_id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getAppliedDetails?app_id=${app_id}&user_type=${user_type}&user_id=${user_id}`);
  }

  getHrdInfo(user_id: any, degree_type: any, faculty_type:any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getHrdInfo?user_id=${user_id}&degree_type=${degree_type}&faculty_type=${faculty_type}`);
  }

  updateAllHrd(formData: any, user_id: any, function_type: any, degree_type: any, secondlastSem: any, lastSem: any, purpose_name: any, hrd_id:any) {
    return this.httpClient.post(`${this.baseUrl}/api/student/updateAllHrd`, { "formData": formData, "user_id": user_id, "function_type": function_type, "degree_type": degree_type, "secondlastSem": secondlastSem, "lastSem": lastSem, "purpose_name": purpose_name, "hrd_id": hrd_id });
  }

  getHrdData(user_id: any, hrd_id: any, purpose_name:any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getHrdData?user_id=${user_id}&hrd_id=${hrd_id}&purpose_name=${purpose_name}`);
  }

  getCartDetails(user_id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/getInstituteData?user_id=${user_id}`);
  }

  preViewApplication(user_id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/student/preViewApplication?user_id=${user_id}`);
  }

  //admin
  updateOtp(user_id: any, otp: string) {
    return this.httpClient.post(`${this.baseUrl}/api/admin/updateOtp`,{ "user_id": user_id, "otp": otp});
  }

  updateCollegeFaculty(purpose: any, type: any, function_type: any, formData: any, id: any, user_id: any, user_name: any, app_id: any) {
    return this.httpClient.post(`${this.baseUrl}/api/admin/updateCollegeFaculty`,{ "purpose": purpose, "type": type, "function_type": function_type, "formData": formData, "id": id, "user_id": user_id, "user_name": user_name, "app_id": app_id});
  }

  getCollegeList(id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/admin/getCollegeList?id=${id}`);
  }

  getFacultyList(id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/admin/getFacultyList?id=${id}`);
  }

  deleteCollegeFaculty(purpose: any, dataCollegeFaculty: any, user_id: any, user_name: any, app_id: any) {
    return this.httpClient.post(`${this.baseUrl}/api/admin/deleteCollegeFaculty`,{ "purpose": purpose, "dataCollegeFaculty": dataCollegeFaculty, "user_id": user_id, "user_name": user_name, "app_id": app_id});
  }

  activeinactiveCollege(event: any, dataCollegeFaculty: any, user_id: any, user_name: any, app_id: any) {
    return this.httpClient.post(`${this.baseUrl}/api/admin/activeinactiveCollege`,{ "event": event, "dataCollegeFaculty": dataCollegeFaculty, "user_id": user_id, "user_name": user_name, "app_id": app_id});
  }

  getActivityTrackerList() {
    return this.httpClient.get(`${this.baseUrl}/api/admin/getActivityTrackerList`);
  }

    
    saveNameChangedata(data:any,user_id:any){ 
      console.log("iiiiidddddddddddd",user_id);
      console.log("data",data);
      
        return this.httpClient.post(`${this.baseUrl}/api/attestation/saveLetterNameChangeData`,{"data":data,"user_id":user_id}); 
    }
    getNameChangeData(user_id:any){ 
        return  this.httpClient.get(`${this.baseUrl}/api/attestation/getNameChangeData?user_id=`+user_id); 
    }
    deleteInfo(id:any,type:any){
      return this.httpClient.delete(`${this.baseUrl}/api/attestation/deleteInfo?id=${id}&type=${type}`);
    }


    // getCollegeList(){
    //   return this.httpClient.get(`${this.baseUrl}/api/getCollegeList`);
    // }

    getuploadedCurriculum(user_id:any){
      return this.httpClient.get(`${this.baseUrl}/api/dashboard/getuploadedCurriculum?user_id=`+user_id,);
    }

    deleteDocument(id:any,type:any,user_id:any){ 
          return this.httpClient.delete(`${this.baseUrl}/api/attestation/deleteDocument?id=${id}&type=${type}&user_id=${user_id}`); 
    } 
    getFacultyLists(){ 
        return this.httpClient.get(`${this.baseUrl}/api/getFacultyLists`);
      }
       
      saveUserMarkList(formData:any){ 
        console.log("formData",formData);
        formData.forEach((value:any, key:any) => {
          console.log("hello",key, value);
        });
        
        return this.httpClient.post(`${this.baseUrl}/api/attestation/saveUserMarkList`,formData)  
      }

      test(userid:any){
        console.log("aakak");
        
        return this.httpClient.post(`${this.baseUrl}/api/attestation/test`,userid)  
      }

}    