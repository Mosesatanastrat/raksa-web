import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbModule,
  NgbModalModule,
  NgbNavModule,
  NgbToastModule,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgSelectModule } from '@ng-select/ng-select';

import { PagesRoutingModule, RoutingComponents } from './pages-routing.module';

import { CustomeTimePickerComponent } from '../custome-time-picker/custome-time-picker.component';

import { ApitestComponent } from './apitest/apitest.component';

@NgModule({
  declarations: [RoutingComponents, ApitestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    NgbNavModule,
    CarouselModule,
    NgSelectModule,
    PagesRoutingModule,
    NgbToastModule,
    CustomeTimePickerComponent,
  ],
  providers: [NgbActiveModal],
})
export class PagesModule {}
