import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '../loader.component';

import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  exports: [LoaderComponent],
})
export class LoaderModule { }
