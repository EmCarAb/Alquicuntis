import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AppConstants } from 'src/app/shared/app-constants';
import { PedidoGuardar } from 'src/app/shared/interfaces/pedidos';
import { Producto } from 'src/app/shared/interfaces/producto';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {

  public listaProductos: Producto[] = [];
  tipo: number = 0;
  URLImagenes: string = AppConstants.IMAGEN_ENDPOINT + '/';

  constructor( private route: ActivatedRoute, private productosService: ProductosService,public toastService: ToastService, public authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'];
      this.loadProducts()
    });
  }

  loadProducts(){
    this.productosService.getWithFilter(this.tipo).subscribe(data => this.listaProductos = data)
  }

}