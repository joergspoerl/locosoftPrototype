import { ViewContainerRef } from '@angular/core';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastMessageProvider {

  constructor(
    public http: Http,
    public toastr: ToastsManager,
  ) {
    console.log('Hello LoadingProvider Provider');
    //this.setRootViewContainerRef(vcr)

  }

  setRootViewContainerRef(vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  show(message: string) {
    console.log("Show");

    //    this.toastr.info(message, null, {toastLife: 1000, });

    this.toastr.success(message, 'Success!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
        }, 10000);
      });
  }

  hide() {
    console.log("hide");
  }
}
