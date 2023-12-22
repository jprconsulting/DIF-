import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariosRoutingModule } from './beneficiarios-routing.module';
import { BeneficiariosComponent } from './beneficiarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    BeneficiariosComponent
  ],
  imports: [
    CommonModule,
    BeneficiariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule
  ]
})
export class BeneficiariosModule { }
