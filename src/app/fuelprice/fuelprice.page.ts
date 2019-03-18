import { Component, OnInit } from '@angular/core';
import { UserService } from '../provider/user.service';

@Component({
  selector: 'app-fuelprice',
  templateUrl: './fuelprice.page.html',
  styleUrls: ['./fuelprice.page.scss'],
})
export class FuelpricePage implements OnInit {
  cities:any=[];
  city:any="Delhi"
  petrolData:any;
  dieselData:any;
  constructor(public api: UserService, ) { }

  ngOnInit() {
    this.onCityChange(this.city);
    this.getCities();

  }

  async getCities() {
    this.api.getPrice().subscribe(res => {
      console.log("city res", res);
      this.cities=res;
    }, err => {
      console.log(err);
    });
  }

  async onCityChange(city) {
    this.api.getcityprice(city).subscribe(res => {
      console.log("price res", res);
      this.petrolData=res[0];
      this.dieselData=res[1];
      console.log("petrol",this.petrolData)
    }, err => {
      console.log(err);
    });
  }

}
