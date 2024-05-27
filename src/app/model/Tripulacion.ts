export class Tripulacion {
  id: number;
  usuario: number;
  nave: number;
  rol: string;

  constructor(
    id: number = 0,
    usuario: number,
    nave: number,
    rol: string = ''
  ) {
    this.id = id;
    this.usuario = usuario;
    this.nave = nave;
    this.rol = rol;
  }

  toJSON() {
    return {
      id: this.id,
      usuario: this.usuario,
      nave: this.nave, // Assuming a light reference to avoid circular serialization
      rol: this.rol
    };
  }

  static fromJSON(json: any): Tripulacion {
    return new Tripulacion(
      json.id,
      json.Usuario,
      json.Nave, // Careful with circular references if Nave also stores Tripulacion
      json.rol
    );
  }
}
