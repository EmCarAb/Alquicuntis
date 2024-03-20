import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/shared/interfaces/solicitud';
import { SolicitudesService } from 'src/app/shared/services/solicitudes.service';
import { TIPO_ENTREGA } from 'src/app/shared/tipos/entrega';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  public listaSolicitudes: Solicitud[] = [];
  public tipoEntrega = TIPO_ENTREGA;

  constructor ( private solicitudesService: SolicitudesService, private router:Router) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(){
    this.solicitudesService.get().subscribe(data => this.listaSolicitudes = data)
  }

  deleteSolicitud(id: number){
    this.solicitudesService.delete(id).subscribe({
      next: () => {
        this.loadSolicitudes();
      },
      error: (error) => console.error(error)
    })
  }
}
