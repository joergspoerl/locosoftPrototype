import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { TestComponent } from './test/test';
import { IonicModule } from 'ionic-angular'

@NgModule({
	declarations: [NavigationComponent,
    TestComponent],
	imports: [IonicModule],
	exports: [NavigationComponent,
    TestComponent]
})
export class ComponentsModule {}
