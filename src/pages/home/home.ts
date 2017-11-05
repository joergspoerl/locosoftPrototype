import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading'
import { ContactProvider, Contact } from '../../providers/contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastCustomerSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingProvider: LoadingProvider,
    public contactProvider: ContactProvider
  ){

  }
}
