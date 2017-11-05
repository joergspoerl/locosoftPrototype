import { Component, ViewContainerRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading'
import { ContactProvider, Contact } from '../../providers/contact/contact';

import { LoggingProvider } from '../../providers/logging/logging'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastCustomerSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loggingProvider: LoggingProvider,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ){

    this.toastr.setRootViewContainerRef(vcr);

    loggingProvider.log("HomePage Contructor !");
    //this.toastr.success('You are awesome!', 'Success!');
   
    
  }

  showCustom() {
    console.log("showCustom")
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
}
