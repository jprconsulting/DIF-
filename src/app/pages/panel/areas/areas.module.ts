import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { AreasComponent } from './areas.component';
import { AreasRoutingModule } from './areas-routing.module';

@NgModule({
  declarations: [
    AreasComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule
  ]
})
export class AreasModule { }
