import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-programassociales',
  templateUrl: './programassociales.component.html',
  styleUrls: ['./programassociales.component.css']
})
export class ProgramassocialesComponent {
  SocialForm!: FormGroup;
  selectedColor: string = '';
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.Validaciones();
  }

  Validaciones(){
    this.SocialForm = this.formBuilder.group({
      id: [null],
      Nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
      AreaAdscripcionId: ['',Validators.required],
      areaAdscripcion: [''],
      Descripcion: [''],
      Color: [null],
      Estatus: [true, [Validators.required]],
      Acronimo: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],

    });
  }
  
  updateColor(event: any) {
    this.selectedColor = event.color.hex; // Assuming the color value is a string
  }
  toggleEstatus() {
    const estatusControl = this.SocialForm.get('Estatus');

    if (estatusControl) {
      estatusControl.setValue(estatusControl.value === 1 ? 0 : 1);
    }
  }
  ResetForm() {
    this.SocialForm.reset();
  }
}
