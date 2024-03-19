import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  userForm: FormGroup = new FormGroup({});

  constructor( private authService: AuthService, public toastService: ToastService, private router:Router){
  }

  get nombre()      {return this.userForm.get('nombre')!}
  get apellidos()   {return this.userForm.get('apellidos')!}
  get username()    {return this.userForm.get('username')!}
  get correo()      {return this.userForm.get('correo')!}
  get contrasenha() {return this.userForm.get('contrasenha')!}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        nombre: new FormControl(),
        apellidos: new FormControl(),
        username: new FormControl(),
        correo: new FormControl('', [Validators.required, Validators.email]),
        contrasenha: new FormControl('', [Validators.required, this.passwordValidator]),
    });
  }

  addUser(){
    let usuario: any = new FormData();

    usuario.append('nombre', this.nombre.value);
    usuario.append('apellidos', this.apellidos.value);
    usuario.append('username', this.username.value);
    usuario.append('correo', this.correo.value);
    usuario.append('contrasenha', this.contrasenha.value);

    this.authService.addUser(usuario).subscribe({
      next: () => {
         this.showSuccess();
        this.router.navigate(['/']);
      },
      error: (error) => this.showDanger()
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasMinLength = value.length >= 8;
  
    if (!hasUpperCase || !hasMinLength) {
      return { passwordRequirements: true };
    }
  
    return null;
  }

  showSuccess() {
	this.toastService.show('Usuario creado correctamente', { classname: 'bg-success text-light', delay: 5000 });
	}

	showDanger() {
		this.toastService.show('Credenciales inválidas. El correo o el username ya existen.', { classname: 'bg-danger text-light', delay: 15000 });
	}
}
