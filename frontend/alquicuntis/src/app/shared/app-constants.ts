import { enviroment } from "src/enviroments/enviroment";

export class AppConstants {
    public static readonly USERS_PATH           = "/api/usuarios"
    public static readonly IMAGEN_PATH          = "/api/imagenes"
    public static readonly PRODUCTOS_PATH       = "/api/productos"
    public static readonly SOLICITUDES_PATH     = "/api/solicitudes"
    public static readonly PEDIDOS_PATH         = "/api/pedidos"
    public static readonly PEDIDOS_USUARIO_PATH = "/api/pedidos-usuario"
    public static readonly USERS_ENDPOINT           = new URL( this.USERS_PATH, enviroment.backendURL).toString() 
    public static readonly PRODUCTOS_ENDPOINT       = new URL( this.PRODUCTOS_PATH, enviroment.backendURL).toString() 
    public static readonly SOLICITUDES_ENDPOINT     = new URL( this.SOLICITUDES_PATH, enviroment.backendURL).toString() 
    public static readonly PEDIDOS_ENDPOINT         = new URL( this.PEDIDOS_PATH, enviroment.backendURL).toString() 
    public static readonly PEDIDOS_USUARIO_ENDPOINT = new URL( this.PEDIDOS_USUARIO_PATH, enviroment.backendURL).toString() 
    public static readonly IMAGEN_ENDPOINT          = new URL( this.IMAGEN_PATH, enviroment.backendURL).toString() 
}