import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  loader: Loading;

  constructor(
    public http: Http,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    console.log('Hello LoadingProvider Provider');
  }

  show(message:string) {
    console.log("Show");
//    this.hide() // if a other loader is shown.

    // var loader = this.loadingCtrl.create({
    //   content: message,
    //   duration: 2000
    // });
    // loader.present();

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();

  }

  hide() {
    console.log("hide");

    // try {
    //   this.loader.dismiss();
    // }
    // catch (exception) {}

    
  }
}
