import { Component, ViewContainerRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';

import { LoggingProvider } from '../../providers/logging/logging'
import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastCustomerSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loggingProvider: LoggingProvider,
    public loadingProvider: ToastMessageProvider,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ){

    this.loadingProvider.setRootViewContainerRef(vcr);

    loggingProvider.log("HomePage Contructor !");
    //this.toastr.success('You are awesome!', 'Success!');
   
    
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom() {
    console.log("showCustom")
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

  showControlled() {
    
    this.loadingProvider.show("Test")
}

}
