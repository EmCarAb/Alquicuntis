import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './features/productos/productos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { PrincipalComponent } from './features/principal/principal.component';
import { ReparacionesComponent } from './features/reparaciones/reparaciones.component';
import { MaquinasComponent } from './features/maquinas/maquinas.component';
import { AddProductosComponent } from './features/add-productos/add-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModProductosComponent } from './features/mod-productos/mod-productos.component';
import { SolicitudesComponent } from './features/solicitudes/solicitudes.component';
import { AuthInterceptor } from './_services/auth.interceptor';
import { ErrorInterceptor } from './_services/error.interceptor';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { PedidosComponent } from './features/pedidos/pedidos.component';
import { ListPedidosComponent } from './features/list-pedidos/list-pedidos.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ComprasComponent } from './shared/compras/compras.component';
import { MensajeBorrarComponent } from './shared/mensaje-borrar/mensaje-borrar.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    MenuComponent,
    PrincipalComponent,
    ReparacionesComponent,
    MaquinasComponent,
    AddProductosComponent,
    ModProductosComponent,
    SolicitudesComponent,
    UsuariosComponent,
    PedidosComponent,
    ListPedidosComponent,
    ComprasComponent,
    MensajeBorrarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
