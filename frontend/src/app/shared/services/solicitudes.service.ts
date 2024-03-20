import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Solicitud, SolicitudGuardar } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Solicitud[]>(AppConstants.SOLICITUDES_ENDPOINT);
  }

  add(solicitud: FormData) {
    return this.http.post<SolicitudGuardar>(AppConstants.SOLICITUDES_ENDPOINT, solicitud);
  }

  delete(id: number) {
    return this.http.delete<any>(AppConstants.SOLICITUDES_ENDPOINT + '/' + id)
  }
}
