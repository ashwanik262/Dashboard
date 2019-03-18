import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
const apiUrl = "http://api.zippopotam.us/";
const RegisterUrl =" https://reqres.in/api/register"
const loginUrl =" https://reqres.in/api/login"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }
 
  login(data:any): Observable<any> {
    let response = this.http.post(loginUrl,data);
    return response;
  }
  getDetails(): Observable<any> {
    let response1 = this.http.get(apiUrl+'US/00210');
    let response2= this.http.get(apiUrl+'IN/110096');
    let response3 = this.http.get(apiUrl+'BR/01000-000');
    let response4 = this.http.get(apiUrl+'FR/01000');
    return forkJoin([response1, response2, response3, response4]);
  }

  getPrice(): Observable<any>{
    let url="https://still-tundra-35330.herokuapp.com/main/city_list"
    let response = this.http.get(url);
    return response;
  }

  getcityprice(city_name): Observable<any>{
    let url="https://still-tundra-35330.herokuapp.com/main/"+city_name+"/"+"petrol"+"/price";
    let url1="https://still-tundra-35330.herokuapp.com/main/"+city_name+"/"+"diesel"+"/price";
    let response = this.http.get(url);
    let response1 = this.http.get(url1);
    return forkJoin([response, response1]);
  }
}
