import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/shared/interfaces/producto';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { TIPO_MAQUINAS } from 'src/app/shared/tipos/maquinas';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listaProductos: Producto[] = [];
  public tipoMaquinas = TIPO_MAQUINAS;

  constructor ( private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productosService.get().subscribe(data => this.listaProductos = data)
  }

  deleteProduct(id: number){
    this.productosService.delete(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => console.error(error)
    })
  }
}
