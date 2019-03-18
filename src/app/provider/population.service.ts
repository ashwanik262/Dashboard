import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  constructor(private http: HttpClient) { }

  getPopulation(country,year){
    let url="https://api.population.io:443/1.0/population/"+year+"/"+country+"/";
    let response = this.http.get(url);
    return response;
  }

  getCountryList(){
    let url="https://api.population.io:443/1.0/countries";
    let response = this.http.get(url);
    return response;
  }

  ageGroupData(year,country,age) : Observable<any>{
    let url="https://api.population.io:443/1.0/population/"+year+"/"+country+"/"+age+"/";
    let response = this.http.get(url);
    return response;
  }

  todayTomorrowdata(country) : Observable<any>{
    let url="https://api.population.io:443/1.0/population/"+country+"/today-and-tomorrow/";
    let response = this.http.get(url);
    return response;
  }

  mortalityDistribution(country) : Observable<any>{
    let url="https://api.population.io:443/1.0/mortality-distribution/"+country+"/male/25y/today/";
    let url1="https://api.population.io:443/1.0/mortality-distribution/"+country+"/female/25y/today/";
    let response = this.http.get(url);
    let response1= this.http.get(url1);
    return forkJoin([response, response1]);
  } 
}
