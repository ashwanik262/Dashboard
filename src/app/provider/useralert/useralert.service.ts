import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController , AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UseralertService {
  loading:any;

  constructor(private toastCtrl : ToastController, private alertCtrl : AlertController,
    private loadingCtrl: LoadingController) {

     }

     	/**
	 * [showError description]
	 * @param {[string]} message   Message to be shown
	 * @param {[string]} duration Duration for which to show the toast
	 * @param {[string]} position Position on screen where the toast should be shown
	 * @param {[boolean]} showCloseButton Should the close button be shown or not
	 * @param {[string]} closeButtonText Text Label for the close button
	 */
	async showError(message, ...params){
    let duration = params[0] || 4000;
      let position = params[1] || 'top';
      let showCloseButton = params[2] || false;
      let closeButtonText =  params[3] || "Close";
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText
    });
    toast.present();
  }
  

 /**
  * Show a loader with a loading spinner and a message as provided via the parameters
  * The loader will not be shown untill the present() call is made.
  *
  * @param {string}  message              	[Message to be shown along with the spinner. Can contain HTML]
  * @param {boolean} enableBackdropDismiss	[Boolean specifying if backdrop click to dismiss shouldbe enabled or not]
  *
  * @returns {Loading}	loader				[Newly created loader object]
  */
 async presentLoadingDefault() {
  this.loading = await this.loadingCtrl.create({
    message: 'Loading......'
  });

   this.loading.present();

 }
}
