export class User {
  id: number;
  nombreUsuario: string;
  contraseña: string; // Consider renaming to 'hashContrasena' if storing password hashes
  rol: string;
  foto: string;

  constructor(
    id: number = 0,
    nombreUsuario: string = '',
    contraseña: string = '',
    rol: string = '',
    foto: string = ''
  ) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
    this.rol = rol;
    this.foto = foto;
  }

  toJSON() {
    return {
      id: this.id??0,
      nombreUsuario: this.nombreUsuario,
      // Do not include contraseña field in JSON output for security reasons
      rol: this.rol,
      foto: this.foto
    };
  }
}
