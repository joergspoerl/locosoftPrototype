import { Component, ViewContainerRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';

import { LoggingProvider } from '../../providers/logging/logging'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastCustomerSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loggingProvider: LoggingProvider,
  ){

    loggingProvider.log("HomePage Contructor !");
  }

}
