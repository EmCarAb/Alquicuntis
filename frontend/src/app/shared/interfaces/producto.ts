export interface Producto {
    id: number,
    tipo: number,
    nombre: string,
    modelo: string,
    stock: number,
    precio: number,
    imagen: string
}

export interface ProductoGuardar {
    tipo: number,
    nombre: string,
    modelo: string,
    stock: number,
    precio: number,
    imagen: File | null
}