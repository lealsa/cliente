import { Producto } from "./Producto";

export class Planeta {
  id: number;
  nombrePlaneta: string;
  imagen: string;
  productos: Producto[];

  constructor(
    id: number = 0,
    nombrePlaneta: string = '',
    imagen: string = '',
    productos: Producto[] = []
  ) {
    this.id = id;
    this.nombrePlaneta = nombrePlaneta;
    this.imagen = imagen;
    this.productos = productos;
  }

  toJSON() {
    return {
      id: this.id,
      nombrePlaneta: this.nombrePlaneta,
      imagen: this.imagen,
      productos: this.productos.map(producto => producto.toJSON())
    };
  }

  static fromJSON(json: any): Planeta {
    const productos = json.productos.map((productoJson: any) => Producto.fromJSON(productoJson));
    return new Planeta(
      json.id,
      json.nombrePlaneta,
      json.imagen,
      productos
    );
  }
}
