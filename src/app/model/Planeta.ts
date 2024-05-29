import { Estrella } from "./Estrella";
import { Nave } from "./Nave";
import { Producto } from "./Producto";
import { Stock } from "./Stock";  // Asegúrate de tener una clase StockPlaneta si decides manejar el inventario de forma explícita.

export class Planeta {
  id: number;
  nombrePlaneta: string;
  imagen: string;
  productos: Producto[];
  naves: Nave[];
  inventario: Stock[];  // Inventario en términos de StockPlaneta si está definido.
  estrella: Estrella;

  constructor(
    id: number = 0,
    nombrePlaneta: string = '',
    imagen: string = '',
    productos: Producto[] = [],
    naves: Nave[] = [],
    inventario: Stock[] = [],
    estrella: Estrella = new Estrella()
  ) {
    this.id = id;
    this.nombrePlaneta = nombrePlaneta;
    this.imagen = imagen;
    this.productos = productos;
    this.naves = naves;
    this.inventario = inventario;
    this.estrella = estrella;
  }

  toJSON() {
    return {
      id: this.id,
      nombrePlaneta: this.nombrePlaneta,
      imagen: this.imagen,
      productos: this.productos.map(producto => producto.toJSON()),
      naves: this.naves.map(nave => nave.toJSON()),
      inventario: this.inventario.map(stock => stock.toJSON()),
      estrella: this.estrella.toJSON()
    };
  }

  static fromJSON(json: any): Planeta {
    const productos = json.productos.map((productoJson: any) => Producto.fromJSON(productoJson));
    const naves = json.naves.map((naveJson: any) => Nave.fromJSON(naveJson));
    const inventario = json.inventario.map((stockJson: any) => Stock.fromJSON(stockJson));
    return new Planeta(
      json.id,
      json.nombrePlaneta,
      json.imagen,
      productos,
      naves,
      inventario,
      Estrella.fromJSON(json.estrella)
    );
  }
}
