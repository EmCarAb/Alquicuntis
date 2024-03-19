import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudesService } from 'src/app/shared/services/solicitudes.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit{

  solicitudForm: FormGroup = new FormGroup({});

  constructor(private solicitudesService: SolicitudesService, public toastService: ToastService, private router: Router){}

  
  get nombre_usuario() {return this.solicitudForm.get('nombre_usuario')!}
  get apellidos()      {return this.solicitudForm.get('apellidos')!}
  get correo()         {return this.solicitudForm.get('correo')!}
  get razon()          {return this.solicitudForm.get('razon')!}
  get entrega()        {return this.solicitudForm.get('entrega')!}
  get direccion()      {return this.solicitudForm.get('direccion')!}
 

  ngOnInit(): void {
       this.solicitudForm = new FormGroup(
      {
        nombre_usuario: new FormControl(),
        apellidos: new FormControl(),
        correo: new FormControl('', [Validators.required, Validators.email]),
        razon: new FormControl(),
        entrega: new FormControl(),
        direccion: new FormControl(''),
    });
  }

  addSolicitud(){
    let solicitud: any = new FormData();

    solicitud.append('nombre_usuario', this.nombre_usuario.value);
    solicitud.append('apellidos', this.apellidos.value);
    solicitud.append('correo', this.correo.value);
    solicitud.append('razon', this.razon.value);
    solicitud.append('entrega', this.entrega.value);
    solicitud.append('direccion', this.direccion.value);
  
    this.solicitudesService.add(solicitud).subscribe({
      next: () => {
        this.showSuccess();
        this.router.navigate(['/']);
      },
      error: (error) => this.showDanger()
    });
  }
  
  showSuccess() {
		this.toastService.show('Solicitud enviada', { classname: 'bg-success text-light', delay: 5000 });
	}

	showDanger() {
		this.toastService.show('Error', { classname: 'bg-danger text-light', delay: 10000 });
	}
}
