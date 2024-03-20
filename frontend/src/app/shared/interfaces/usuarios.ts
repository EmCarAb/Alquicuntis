export interface Usuario {
    id: number,
    nombre: string,
    apellidos: string,
    username:string,
    correo:string,
    contrasenha: string
}

export interface UsuarioGuardar {
    nombre: string,
    apellidos: string,
    username: string,
    correo:string,
    contrasenha: string
}