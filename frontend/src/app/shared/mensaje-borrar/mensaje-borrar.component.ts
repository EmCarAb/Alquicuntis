import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../interfaces/producto';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-mensaje-borrar',
  templateUrl: './mensaje-borrar.component.html',
  styleUrls: ['./mensaje-borrar.component.css']
})

export class MensajeBorrarComponent {
  
  public listaProductos: Producto[] = [];
  closeResult = '';
  @Input() id: number = 0;
  @Input() nombre: string = "";
  @Output() borrar = new EventEmitter();
  @ViewChild('content') someInput: any;

	constructor(private modalService: NgbModal, private productosService: ProductosService, public toastService: ToastService, private router: Router) {}

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
   this.deleteProduct(this.id)
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

  deleteProduct(id: number){
    this.productosService.delete(id).subscribe({
      next: () => {
        this.showSuccess()
        this.borrar.emit()
      },
      error: (error) => this.showDanger()
    })
  }

  showSuccess() {
		this.toastService.show('Producto eliminado', { classname: 'bg-success text-light', delay: 10000 });
	}

  showDanger() {
		this.toastService.show('Error', { classname: 'bg-danger text-light', delay: 10000 });
	}
}
