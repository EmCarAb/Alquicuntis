import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedidos';
import { PedidosService } from 'src/app/shared/services/pedidos.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})
export class ListPedidosComponent implements OnInit {

  public listaPedidos: Pedido[] = [];

  constructor ( private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.pedidosService.getByUser().subscribe(data => this.listaPedidos = data)
  }

}
