import { ViewContainerRef } from '@angular/core';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastMessageProvider {

  toasts: Toast[];

  constructor(
    public http: Http,
    //public toastr: ToastsManager,
  ) {
    console.log('Hello LoadingProvider Provider');
    //this.setRootViewContainerRef(vcr)

  }


  show(message: string) {
    // console.log("Show");

    // //    this.toastr.info(message, null, {toastLife: 1000, });

    // this.toastr.success(message, 'Success!', { dismiss: 'controlled' })
    //   .then((toast: Toast) => {
    //     setTimeout(() => {
    //       this.toastr.dismissToast(toast);
    //     }, 10000);
    //   });
  }

  // testLoading (message: string):Toast {
  //   var spinner = '<ion-spinner></ion-spinner>';

  //   return this.toastr.setupToast(new Toast('info', 'Hello', null, { dismiss: 'controlled', enableHTML: true }))
 
  // }


  // hide(toast) {
  //   console.log("hide");

  //   if (toast)
  //     this.toastr.dismissToast(toast)
  // }
}
