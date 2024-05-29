export class Producto {
  id: number;
  nombre: string;
  imagen: string;
  volumen: number;

  constructor(
    id: number = 0,
    nombre: string = '',
    imagen: string = '',
    volumen: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.volumen = volumen;
  }

  toJSON(): { id: number; nombre: string; imagen: string; volumen: number } {
    return {
      id: this.id,
      nombre: this.nombre,
      imagen: this.imagen,
      volumen: this.volumen
    };
  }

  static fromJSON(json: any): Producto {
    return new Producto(
      json.id,
      json.nombre,
      json.imagen,
      json.volumen
    );
  }
}
