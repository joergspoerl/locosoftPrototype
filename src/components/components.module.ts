import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { TestComponent } from './test/test';
import { IonicModule } from 'ionic-angular'
import { ContactPictureComponent } from './contact-picture/contact-picture';
import { PictureUploadComponent } from './picture-upload/picture-upload';

@NgModule({
	declarations: [NavigationComponent,
    TestComponent,
    ContactPictureComponent,
    PictureUploadComponent],
	imports: [IonicModule],
	exports: [NavigationComponent,
    TestComponent,
    ContactPictureComponent,
    PictureUploadComponent]
})
export class ComponentsModule {}
