export class User {
  id: number;
  nombreUsuario: string;
  contraseña: string;  // Consider storing only hashed passwords and rename if only hashes are stored
  rol: string;

  constructor(
    id: number = 0,
    nombreUsuario: string = '',
    contraseña: string = '',
    rol: string = '',
  ) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;  // Ensure this is hashed if coming from user input
    this.rol = rol;
  }

  toJSON() {
    return {
      id: this.id,
      nombreUsuario: this.nombreUsuario,
      // Exclude the contraseña field from the JSON output for security reasons
      rol: this.rol,
    };
  }
  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.nombreUsuario,
      json.contraseña, // Be cautious with handling sensitive data like passwords
      json.rol,
    );
  }
}
