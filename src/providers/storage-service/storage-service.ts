import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageServiceProvider {

  constructor(public http: HttpClient) {
    
  }

  getKey(key){
    return window.localStorage.getItem(key);
  }
  setKey(key, value){
    window.localStorage.setItem(key, value);
  }

}
