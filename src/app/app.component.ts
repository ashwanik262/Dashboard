import { Component } from '@angular/core';

import { Platform ,AlertController,NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Fule Price',
      url: '/fuelprice',
      icon: 'flame'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertCtrl : AlertController,
    private navCtrl : NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (localStorage.getItem('token')) {
        console.log('LOGGED');
        this.router.navigateByUrl('/home');

    } else {
        console.log('NOT LOGGED')
        this.router.navigateByUrl('');
    }
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  pages(url){
    console.log("url is ",url)
      this.navCtrl.navigateForward(url)
  }

  async logoutAlert() {
    const alert = await this.alertCtrl.create({
      header: 'LOGOUT?',
      message: 'Do you agree to <b>LOGOUT</b>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'LOGOUT',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout(){
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
