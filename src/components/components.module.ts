import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { TestComponent } from './test/test';
import { IonicModule } from 'ionic-angular'
import { ContactPictureComponent } from './contact-picture/contact-picture';

@NgModule({
	declarations: [NavigationComponent,
    TestComponent,
    ContactPictureComponent],
	imports: [IonicModule],
	exports: [NavigationComponent,
    TestComponent,
    ContactPictureComponent]
})
export class ComponentsModule {}
