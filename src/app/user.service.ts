import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl='http://localhost:3000/'

 
  constructor(private http:HttpClient) { }

  addprofile(profile:any){
    console.log('product data',profile)
    let endpoint = 'dbprofile';
    // let headers = new HttpHeaders()
    // headers = headers.set("Content-type","application/json")

    return this.http.post(this.baseurl+endpoint,profile)
   
  }
  getcalssinfo(){
    let endpoint = "userclass";
    return this.http.get(this.baseurl+endpoint)
  }

  getprofileList(){
    let endpoint = 'dbprofile';
    return this.http.get(this.baseurl+endpoint)
  }

  deleteprofile(id:any){
    let endpoint = 'dbprofile';
    return this.http.delete(this.baseurl+endpoint+'/'+id)

  }

  fetchProfile(profileID:any){
    let endpoint = 'dbprofile';
    const params  = new HttpParams()
    
    .set("id",profileID)
    return this.http.get(this.baseurl+endpoint,{params})

  }

  updateProfile(profile:any,id:any){
    let endpoint = 'dbprofile';
    return this.http.put(this.baseurl+endpoint+'/'+id,profile)

  }

 
 
}
