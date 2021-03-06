import { Component, Input,  OnChanges, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import { ContactProvider, Contact } from '../../providers/contact/contact';

/**
 * Generated class for the ContactPictureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-picture',
  templateUrl: 'contact-picture.html'
})
export class ContactPictureComponent {
  @Input() contactId: string;
  @Input() contactRev: string;
  
  text: string;
  url: any = "";
  urlOrign: any;

  constructor(
    public contactProvider: ContactProvider,
    private sanitizer: DomSanitizer,
    
  ) {
    //
  }

  ngOnInit() {
    //this.text = 'picture';
    let self = this;

    self.contactProvider.dbLocal.getAttachment(self.contactId, 'picture.png').then(
      blob => {
        self.urlOrign = URL.createObjectURL(blob);
        self.url = self.sanitizer.bypassSecurityTrustUrl(self.urlOrign);
        //console.log("self.url", self.url);
      },
      error => { 
        this.text = "n/a"
        console.log(error)
      }
    )

  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    //console.log("changes: ", changes);
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy () {
    //console.log("ngOnDestroy");
    URL.revokeObjectURL(this.urlOrign);
  }
}
