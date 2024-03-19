import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PedidoGuardar } from '../interfaces/pedidos';
import { PedidosService } from '../services/pedidos.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  closeResult = '';
  @Input() id: number = 0;
  @Input() nombre: string = "";
  @Output() comprar = new EventEmitter();
  @ViewChild('content') someInput: any;

	constructor(private modalService: NgbModal, public toastService: ToastService, private pedidosService: PedidosService) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if(result==1)
          this.aceptar();
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  aceptar(){
   this.hacerPedido(this.id)
  }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  hacerPedido(id: number){
    let pedido: PedidoGuardar = {
      producto_id: id
    };
    
    this.pedidosService.add(pedido).subscribe({
      next: () => {
       this.comprar.emit()
       this.showSuccess();
      },
      error: (error) => console.error(error)
    })
  }

  showSuccess() {
		this.toastService.show('Producto comprado', { classname: 'bg-success text-light', delay: 5000 });
	}
}
