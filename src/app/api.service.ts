import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable, Subscriber} from 'rxjs';
import { config } from 'config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = config.serverUrl;
  constructor(private httpClient : HttpClient,
    ) { }

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

    login(email:any,password:any){ console.log("Called In API");
          return this.httpClient.post(`${this.baseUrl}/api/auth/login`,{"email":email,"password":password});
        }   
      
    RegisterValues(data:any){ console.log("REGISTERRRRR");
              return this.httpClient.post(`${this.baseUrl}/api/auth/register`,{data : data});
          }
      
    ForgotPassword(email:any){ console.log("FORGOTTTT");
        return this.httpClient.post(`${this.baseUrl}/ai/auth/forgot-password`, {data:email})
      }

    getCaptcha(){ console.log("CAPTCHAAAA");
            return this.httpClient.get(`${this.baseUrl}/api/auth/captcha`);
      }

    Otpvalue(data:any){ console.log("OTP");
          return this.httpClient.post(`${this.baseUrl}/api/auth/verify-otp-reg`,{data : data});
      }

    UpdateNumberOTP(data:any){ console.log("RESEND OTP");
          return this.httpClient.post(`${this.baseUrl}/api/auth/resend-otp`,{data : data});    
    } 
    
    getMenuRole(userID: any){
        return this.httpClient.get(`${this.baseUrl}/api/admin/role_management/getMenuRole?userID=`+userID);
    }

    checkapplications(){
      return this.httpClient.get(`${this.baseUrl}/api/attestation/checkapplications`);
    }

    getpreAppldetails(){
      return this.httpClient.get(`${this.baseUrl}/api/dashboard/getpreAppldetails`);
    }
  }    