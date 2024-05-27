import { Producto } from "./Producto";

export class InventarioNave {
  id: number;
  nave: number;  // Typically, only a reference or reduced object would be used to avoid circular serialization.
  producto: Producto;
  stock: number;

  constructor(
    id: number = 0,
    nave: number,
    producto: Producto = new Producto(),
    stock: number = 0
  ) {
    this.id = id;
    this.nave = nave;
    this.producto = producto;
    this.stock = stock;
  }

  toJSON() {
    return {
      id: this.id,
      nave: this.nave,  // Serialize only the ID or minimal details to avoid circular references
      producto: this.producto.toJSON(),
      stock: this.stock
    };
  }

  static fromJSON(json: any): InventarioNave {
    return new InventarioNave(
      json.id,
      json.nave, // Assumes that the nave object is minimally represented, typically as an ID.
      Producto.fromJSON(json.producto),
      json.stock
    );
  }
}
