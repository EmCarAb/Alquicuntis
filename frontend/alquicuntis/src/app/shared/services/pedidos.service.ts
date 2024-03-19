import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido, PedidoGuardar } from '../interfaces/pedidos';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Pedido[]>(AppConstants.PEDIDOS_ENDPOINT)
  }
  
  add(pedido: PedidoGuardar){
    return this.http.post<PedidoGuardar>(AppConstants.PEDIDOS_ENDPOINT, pedido)
  }

  getByUser(){
    return this.http.get<Pedido[]>(AppConstants.PEDIDOS_USUARIO_ENDPOINT)
  }

  delete(id: number) {
    return this.http.delete<any>(AppConstants.PEDIDOS_ENDPOINT + '/' + id)
  }
}
