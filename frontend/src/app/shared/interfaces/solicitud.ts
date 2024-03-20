export interface Solicitud {
    id: number,
    nombre_usuario: string,
    apellidos: string,
    correo: string,
    razon: string,
    entrega: number,
    direccion: string
}

export interface SolicitudGuardar {
    nombre_usuario: string,
    apellidos: string,
    correo: string,
    razon: string,
    entrega: number,
    direccion: string
}