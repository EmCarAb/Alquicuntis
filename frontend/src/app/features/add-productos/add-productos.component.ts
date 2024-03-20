import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css']
})
export class AddProductosComponent implements OnInit {

  productForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;

  constructor( private productosService: ProductosService, public toastService: ToastService, private router:Router, private location: Location){

  }

  get tipo()   {return this.productForm.get('tipo')!}
  get nombre() {return this.productForm.get('nombre')!}
  get modelo() {return this.productForm.get('modelo')!}
  get stock()  {return this.productForm.get('stock')!}
  get precio() {return this.productForm.get('precio')!}
  get imagen() {return this.productForm.get('imagen')!}

  ngOnInit(): void {
    this.productForm = new FormGroup(
      {
        tipo: new FormControl(),
        nombre: new FormControl(),
        modelo: new FormControl(''),
        stock: new FormControl(),
        precio: new FormControl(),
        imagen: new FormControl(),
    });
  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addProduct(){
    let producto: any = new FormData();

    producto.append('tipo', this.tipo.value);
    producto.append('nombre', this.nombre.value);
    producto.append('modelo', this.modelo.value);
    producto.append('stock', this.stock.value);
    producto.append('precio', this.precio.value);
    producto.append('imagen', this.selectedFile);

    this.productosService.add(producto).subscribe({
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
		this.toastService.show('Producto añadido', { classname: 'bg-success text-light', delay: 5000 });
	}

	showDanger() {
		this.toastService.show('Error', { classname: 'bg-danger text-light', delay: 10000 });
	}

}
