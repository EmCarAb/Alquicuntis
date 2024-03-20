export interface Pedido {
    id: number,
    usuario: string
    correo: string,
    producto: string,
    modelo: string,
    precio: number,
    fecha: string
}

export interface PedidoGuardar {
    producto_id: number,
}