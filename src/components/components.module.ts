import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { TestComponent } from './test/test';
import { IonicModule } from 'ionic-angular'
import { ContactPictureComponent } from './contact-picture/contact-picture';
import { PictureUploadComponent } from './picture-upload/picture-upload';
import { ContactListItemComponent } from './contact-list-item/contact-list-item';

@NgModule({
	declarations: [NavigationComponent,
    TestComponent,
    ContactPictureComponent,
    PictureUploadComponent,
    ContactListItemComponent],
	imports: [IonicModule],
	exports: [NavigationComponent,
    TestComponent,
    ContactPictureComponent,
    PictureUploadComponent,
    ContactListItemComponent]
})
export class ComponentsModule {}
