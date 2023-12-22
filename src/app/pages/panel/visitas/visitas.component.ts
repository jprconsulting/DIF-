import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent {
  EvidenciaForm!: FormGroup;
  selectedColor: string = '';
  imagenAmpliada: string | null = null;
  isUpdating: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formularioEvidencia();
  }

  formularioEvidencia(){
    this.EvidenciaForm = this.formBuilder.group({
      id: [null],
      beneficiarioId: ['', [Validators.required]],
      imagenBase64: ['',Validators.required],
      Descripcion: ['', [Validators.required,Validators.minLength(10)]],
    });
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64WithoutPrefix = base64String.split(';base64,').pop() || '';
  
        this.EvidenciaForm.patchValue({
          imagenBase64: base64WithoutPrefix
        });
      };
  
      reader.readAsDataURL(file);
    }
  }
  filtrarProgramaSocial(event: any, tipo: string) {
  }

filtrarArea(event: any, tipo: string) {
}

filterBeneficiarios(searchTerm: string){
}

ResetForm() {
  this.EvidenciaForm.reset();
}

submit() {
  if (this.isUpdating) {
    this.actualizar();
  } else {
    this.agregar();
  }
}

actualizar(){

}

agregar(){

}
}
