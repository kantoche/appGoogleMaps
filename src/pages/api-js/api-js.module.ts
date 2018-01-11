import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApiJsPage } from './api-js';

@NgModule({
  declarations: [
    ApiJsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApiJsPage),
  ],
})
export class ApiJsPageModule {}
