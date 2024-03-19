import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto, ProductoGuardar } from '../interfaces/producto';
import { AppConstants } from '../app-constants';
import { TipoMaquina } from '../tipos/maquinas';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Producto[]>(AppConstants.PRODUCTOS_ENDPOINT)
  }

  getById(id: number){
    return this.http.get<Producto>(AppConstants.PRODUCTOS_ENDPOINT + '/' + id)
  }

  add(producto: FormData){
    return this.http.post<ProductoGuardar>(AppConstants.PRODUCTOS_ENDPOINT, producto)
  }

  delete(id: number) {
    return this.http.delete<any>(AppConstants.PRODUCTOS_ENDPOINT + '/' + id)
  }

  update(producto: ProductoGuardar, id: number){
    return this.http.put<ProductoGuardar>(AppConstants.PRODUCTOS_ENDPOINT + '/' + id, producto)
  }

  getWithFilter(tipo: TipoMaquina){
    let httpOptions = { 
      params: new HttpParams().set('tipo', tipo)
    }
    return this.http.get<Producto[]>(AppConstants.PRODUCTOS_ENDPOINT, httpOptions)
  }
}
