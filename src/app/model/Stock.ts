export class Stock {
  id: number;
  planeta: number; // ID del planeta
  producto: number; // ID del producto
  stock: number;
  factorDemanda: number; // FD
  factorOferta: number; // FO

  constructor(
    id: number = 0,
    planeta: number,
    producto: number,
    stock: number = 0,
    factorDemanda: number = 1,
    factorOferta: number = 1
  ) {
    this.id = id;
    this.planeta = planeta;
    this.producto = producto;
    this.stock = stock;
    this.factorDemanda = factorDemanda;
    this.factorOferta = factorOferta;
  }

  toJSON(): { id: number; planeta: number; producto: number; stock: number; factorDemanda: number; factorOferta: number } {
    return {
      id: this.id,
      planeta: this.planeta,
      producto: this.producto,
      stock: this.stock,
      factorDemanda: this.factorDemanda,
      factorOferta: this.factorOferta
    };
  }

  static fromJSON(json: any): Stock {
    return new Stock(
      json.id,
      json.planeta,
      json.producto,
      json.stock,
      json.factorDemanda,
      json.factorOferta
    );
  }
}
