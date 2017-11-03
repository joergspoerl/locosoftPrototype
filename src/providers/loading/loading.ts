import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';


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
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello LoadingProvider Provider');
  }

  show(message:string) {
    console.log("Show");

    this.loader = this.loadingCtrl.create({
      content: message,
//      duration: 3000
    });
    this.loader.present();

  }

  hide() {
    console.log("hide");

    this.loader.dismiss();
    
  }
}
