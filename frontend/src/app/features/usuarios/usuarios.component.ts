import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/shared/interfaces/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  public listaUsuarios: Usuario[] = [];

  constructor ( private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.authService.getUser().subscribe(data => this.listaUsuarios = data)
  }

}
