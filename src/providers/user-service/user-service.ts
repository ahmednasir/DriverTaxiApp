import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app/app.config';


@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient, 
    // public config: AppConfig
    ) {
  }

  signIn(body): Observable<any>{
    // let URL = this.config.BASE_URL+ this.config.REGISTER_URL;
    let URL = "http://localhost:3000/register"
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<any>(URL,body,{
      observe: "response",
      headers: header
    }).concatMap((data:any)=>{
        return Observable.of(data);
    })
  }

}
