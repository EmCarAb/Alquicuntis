import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedidos';
import { PedidosService } from 'src/app/shared/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public listaPedidos: Pedido[] = [];

  constructor ( private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.pedidosService.get().subscribe(data => this.listaPedidos = data)
  }

  deleteOrders(id: number){
    this.pedidosService.delete(id).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => console.error(error)
    })
  }
}
