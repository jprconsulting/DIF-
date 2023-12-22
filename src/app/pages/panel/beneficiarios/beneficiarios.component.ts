import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { LoadingStates } from 'src/app/global/globals';
import { Usuario } from 'src/app/models/usuario';
import { Rol } from 'src/app/models/Rol';
declare const google: any;

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent implements OnInit {

  @ViewChild('closebutton') closebutton!: ElementRef;

  // Usuarios
  usuario!: Usuario;
  usuarios: Usuario[] = [];
  isLoadingUsers = LoadingStates.neutro;
  usuariosFilter: Usuario[] = [];
  userForm!: FormGroup;
  roles: Rol[] = [];
  isModalAdd = false;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [5, 10, 15];
  filtro: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private mensajeService: MensajeService,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {
    this.crearFormularioUsuario();
  }

  ngOnInit(): void {
    this.usuarioService.refreshLisUsers.subscribe(() => this.getListadoUsuarios());
    this.getListadoUsuarios();
    this.getRoles();
  }

  crearFormularioUsuario() {
    this.userForm = this.formBuilder.group({
        id: [null],
        nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoPaterno: ['',Validators.required],
        apellidoMaterno: ['',Validators.required],
        fechaNacimiento: ['', ],
        domicilio: ['',Validators.required],
        sexo: ['',Validators.required],
        curp: ['',Validators.required],
        latitud: ['',Validators.required],
        longitud: ['',Validators.required],
        estatus: [true, [Validators.required]],
        municipioId: ['',Validators.required],
        programaSocialId: ['',Validators.required],
    });
  }

  getListadoUsuarios() {
    this.isLoadingUsers = LoadingStates.trueLoading;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuariosFromApi) => {
        this.usuarios = usuariosFromApi;
        this.usuariosFilter = this.usuarios;
        this.isLoadingUsers = LoadingStates.falseLoading;
      }, error: () => {
        this.isLoadingUsers = LoadingStates.errorLoading;
      }
    });
  }

  getRoles() {
    this.usuarioService.getRoles().subscribe({
      next: (rolesFromAPI) => {
        this.roles = rolesFromAPI;
      },
      error: (error) => {
        console.log('error al obtener los roles', error);
      }
    });
  }

  resetForm() {
    this.closebutton.nativeElement.click();
    this.userForm.reset();
  }


  agregarUsuario() {
    if (this.userForm.valid) {
      const nuevoUsuario = this.userForm.value;
  
      // Verificar si el nombre de usuario ya existe
      const nombreUsuarioExistente = this.usuarios.some(u => u.nombre === nuevoUsuario.nombre);
      const apellidosUsuarioExistente = this.usuarios.some(u => u.apellidos === nuevoUsuario.apellidos);
  
      // Verificar si el correo electrónico ya existe
      const correoExistente = this.usuarios.some(u => u.email === nuevoUsuario.email);
  
      if (nombreUsuarioExistente) {
        console.error('Ya existe un usuario con este nombre de usuario.');
        this.mensajeService.mensajeError('Ya existe un usuario con este nombre de usuario.');
      } else if (correoExistente) {
        console.error('Ya existe un usuario con este correo electrónico.');
        this.mensajeService.mensajeError('Ya existe un usuario con este correo electrónico.');
      } else {
        this.usuarioService.postUsuario(nuevoUsuario).subscribe({
          next: () => {
            console.log('Usuario agregado con éxito:', nuevoUsuario);
            this.mensajeService.mensajeExito('Usuario agregado con éxito');
            this.resetForm();
            // También puedes agregar el nuevo usuario a la lista local
            this.usuarios.push(nuevoUsuario);
          },
          error: (error) => {
            console.error('Error al agregar usuario:', error);
            this.mensajeService.mensajeError('Error al agregar usuario');
          }
        });
      }
    } else {
      console.error('El formulario de usuario es inválido. No se puede enviar.');
      this.mensajeService.mensajeError('Formulario de usuario inválido. Revise los campos.');
    }
  }
  

  actualizarUsuario() {
    this.usuarioService.putUsuario(this.usuario).subscribe({
      next: () => {
        this.mensajeService.mensajeExito("Usuario actualizado con éxito");
        this.resetForm();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar usuario");
        console.error(error);
      }
    }
    );
  }

  submitUsuario() {
    this.usuario = this.userForm.value as Usuario;
    this.isModalAdd ? this.agregarUsuario() : this.actualizarUsuario();
  }

  borrarUsuario(id: number, nombreUsuario: string) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar el usuario: ${nombreUsuario}?`,
      () => {
        this.usuarioService.deleteUsuario(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Usuario borrado correctamente');
            //this.ConfigPaginator.currentPage = 1;
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }

  handleChangeAdd() {
    this.userForm.reset();
    this.isModalAdd = true;
  }

  setDataModalUpdate(user: Usuario) {
    this.isModalAdd = false;
    this.userForm.patchValue({
      usuarioId: user.usuarioId,
      rolId: user.rolId,
      email: user.email,
      password: user.password,
      estatus: user.estatus,
      nombre: user.nombre,
      apellidos: user.apellidos
    });
    console.log(this.userForm.value);
  }

  filtrarResultados() {
    const filtroLowerCase = this.filtro.toLowerCase().trim();

    return this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filtroLowerCase) ||
      usuario.apellidos.toLowerCase().includes(filtroLowerCase) ||
      usuario.email.toLowerCase().includes(filtroLowerCase)
    );
  }

  map() {
    const mapElement = document.getElementById("map-canvas");
    if (!mapElement) {
      console.error("El elemento del mapa no fue encontrado");
      return;
    }

    const lat = mapElement.getAttribute("data-lat");
    const lng = mapElement.getAttribute("data-lng");

    if (!lat || !lng) {
      console.error("Los atributos de latitud y/o longitud no están presentes");
      return;
    }

    const myLatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    const mapOptions = {
      zoom: 13,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#0ba4e2" }, { visibility: "on" }],
        },
      ],
    };

    const map = new google.maps.Map(mapElement, mapOptions);

    const input = document.getElementById('searchInput');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      if (place.formatted_address) {
        // Actualizar el valor del campo 'domicilio' con la dirección obtenida del mapa
        this.userForm.patchValue({
          domicilio: place.formatted_address
        });
      }

      const selectedLat = place.geometry.location.lat();
      const selectedLng = place.geometry.location.lng();

      mapElement.setAttribute("data-lat", selectedLat.toString());
      mapElement.setAttribute("data-lng", selectedLng.toString());

      const newLatLng = new google.maps.LatLng(selectedLat, selectedLng);
      map.setCenter(newLatLng);
      map.setZoom(15);

      const marker = new google.maps.Marker({
        position: newLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
      });

      const contentString = `
        <!-- Contenido de la ventana de información (infowindow) -->
        <!-- ... -->
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      this.userForm.patchValue({
        longitud: selectedLng,
        latitud: selectedLat
      });
    });
  }

}

