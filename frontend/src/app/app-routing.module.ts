import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './features/productos/productos.component';
import { PrincipalComponent } from './features/principal/principal.component';
import { ReparacionesComponent } from './features/reparaciones/reparaciones.component';
import { MaquinasComponent } from './features/maquinas/maquinas.component';
import { AddProductosComponent } from './features/add-productos/add-productos.component';
import { ModProductosComponent } from './features/mod-productos/mod-productos.component';
import { SolicitudesComponent } from './features/solicitudes/solicitudes.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { RoleBaseGuard } from './_guard/role-base.guard';
import { PedidosComponent } from './features/pedidos/pedidos.component';
import { ListPedidosComponent } from './features/list-pedidos/list-pedidos.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { 
    path: 'productos',
    component: ProductosComponent, 
    canActivate:[RoleBaseGuard]
  },
  { 
    path: 'pedidos',
    component: PedidosComponent, 
    canActivate:[RoleBaseGuard]
  },
  { 
    path: 'usuarios', 
    component: UsuariosComponent,
    canActivate:[RoleBaseGuard]
  },
  { path: 'reparaciones', component: ReparacionesComponent },
  { path: 'list-pedidos', component: ListPedidosComponent },
  { 
    path: 'solicitudes', 
    component: SolicitudesComponent,
    canActivate:[RoleBaseGuard]
  },
  { path: 'productos/maquinas/:tipo', component: MaquinasComponent },
  { path: 'add-productos', component: AddProductosComponent },
  { path: 'mod-productos/:id', component: ModProductosComponent },
  { path: 'maquinas/:tipo', component: MaquinasComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
