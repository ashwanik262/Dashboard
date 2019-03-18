import { Component, OnInit } from '@angular/core';
import { UserService } from '../provider/user.service'; 
import { UseralertService } from '../provider/useralert/useralert.service'; 
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username:string;
  public password:any;
  ;

  constructor(public api: UserService,private userAlert: UseralertService,private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async login(){
    if(!this.username|| !this.password){
      this.userAlert.showError("Please fill all details!")
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Loading......'
    });
    console.log("username",this.username);
    console.log("password",this.password);
    let data={
      username:this.username,
      password:this.password
    }
    this.api.login(data).subscribe(res => {
      console.log(res);
      console.log("token",res.token);
      if(res.token){
        localStorage.setItem("token",res.token)
        this.router.navigateByUrl(`/home`);
      }
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

}
