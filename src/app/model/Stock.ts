export class Stock {
  id: number;
  planeta: number; // Make sure Planeta class is already defined and imported.
  producto: number; // Make sure Producto class is already defined and imported.
  stock: number;
  FD: number; // Factor de Demanda
  FO: number; // Factor de Oferta

  constructor(
    id: number = 0,
    planeta: number,
    producto: number,
    stock: number = 0,
    FD: number = 1,
    FO: number = 1
  ) {
    this.id = id;
    this.planeta = planeta;
    this.producto = producto;
    this.stock = stock;
    this.FD = FD;
    this.FO = FO;
  }

  toJSON() {
    return {
      id: this.id,
      planeta: this.planeta, // Serialize planeta to JSON
      producto: this.producto, // Serialize producto to JSON
      stock: this.stock,
      FD: this.FD,
      FO: this.FO
    };
  }

  static fromJSON(json: any): Stock {
    return new Stock(
      json.id,
      json.Planeta,
      json.Producto,
      json.stock,
      json.FD,
      json.FO
    );
  }
}
