import { Producto } from "./Producto";

export class InventarioNave {
  id: number;
  nave: number;  // ID de la nave, usado para evitar la serialización circular de objetos completos.
  producto: Producto;
  stock: number;

  constructor(
    id: number = 0,
    nave: number,  // Se espera que este campo contenga solo el ID de la nave.
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
      nave: this.nave,  // Se serializa solo el ID para evitar referencias circulares.
      producto: this.producto.toJSON(),
      stock: this.stock
    };
  }

  static fromJSON(json: any): InventarioNave {
    return new InventarioNave(
      json.id,
      json.nave, // Asume que el objeto de nave está representado mínimamente, típicamente como un ID.
      Producto.fromJSON(json.producto),
      json.stock
    );
  }
}
