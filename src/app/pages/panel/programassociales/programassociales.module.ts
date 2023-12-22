import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramassocialesRoutingModule } from './programassociales-routing.module';
import { ProgramassocialesComponent } from './programassociales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [
    ProgramassocialesComponent
  ],
  imports: [
    CommonModule,
    ProgramassocialesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class ProgramassocialesModule { }
