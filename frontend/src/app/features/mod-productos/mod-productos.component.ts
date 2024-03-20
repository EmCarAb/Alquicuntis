import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Producto, ProductoGuardar } from 'src/app/shared/interfaces/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-mod-productos',
  templateUrl: './mod-productos.component.html',
  styleUrls: ['./mod-productos.component.css']
})
export class ModProductosComponent {

  productFormMod: FormGroup = new FormGroup({

      tipo: new FormControl(),
      nombre: new FormControl(),
      modelo: new FormControl(),
      stock: new FormControl(),
      precio: new FormControl(),

  });

  public producto!: Producto;
  private productoId: number = 0;

  constructor(private productosService: ProductosService, public toastService: ToastService, private router:Router, private route: ActivatedRoute, private location: Location) {}

  get tipo() {
    return this.productFormMod.get('tipo') !
  }
  get nombre() {
    return this.productFormMod.get('nombre') !
  }
  get modelo() {
    return this.productFormMod.get('modelo') !
  }
  get stock() {
    return this.productFormMod.get('stock') !
  }
  get precio() {
    return this.productFormMod.get('precio') !
  }


  ngOnInit(): void {
    this.productoId = parseInt(this.route.snapshot.paramMap.get('id') !);
    this.loadProduct();
  }
  

  loadProduct() {
    this.productosService.getById(this.productoId).subscribe(data => {

      this.producto = data
      this.setProductForm()
    })
  }

  setProductForm() {
    this.tipo.setValue(this.producto.tipo)
    this.nombre.setValue(this.producto.nombre)
    this.modelo.setValue(this.producto.modelo)
    this.stock.setValue(this.producto.stock)
    this.precio.setValue(this.producto.precio)
  }

  updateProduct(){
    let producto: ProductoGuardar = {} as ProductoGuardar;

    producto.tipo   = this.tipo.value;
    producto.nombre = this.nombre.value;
    producto.modelo = this.modelo.value;
    producto.stock  = this.stock.value;
    producto.precio = this.precio.value;

    this.productosService.update(producto, this.productoId).subscribe({
      next: () => {
        this.showSuccess();
        this.router.navigate(['/productos']);
      },
      error: (error) => this.showDanger()
    });
  }

  goBack() {
    this.location.back();
  }

  showSuccess() {
		this.toastService.show('Producto modificado', { classname: 'bg-success text-light', delay: 5000 });
	}

	showDanger() {
		this.toastService.show('Error', { classname: 'bg-danger text-light', delay: 10000 });
	}
}
