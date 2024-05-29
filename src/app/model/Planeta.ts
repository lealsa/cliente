import { Estrella } from "./Estrella";
import { Nave } from "./Nave";
import { Producto } from "./Producto";
import { Stock } from "./Stock";

export class Planeta {
  id: number;
  nombrePlaneta: string;
  imagen: string;
  productos: Producto[];
  naves: Nave[];
  inventario: Stock[];
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
      productos: this.productos ? this.productos.map(producto => producto.toJSON()) : [],
      naves: this.naves ? this.naves.map(nave => nave.toJSON()) : [],
      inventario: this.inventario ? this.inventario.map(stock => stock.toJSON()) : [],
      estrella: this.estrella ? this.estrella.toJSON() : null
    };
  }

  static fromJSON(json: any): Planeta {
    const productos = Array.isArray(json.productos) ? json.productos.map((productoJson: any) => Producto.fromJSON(productoJson)) : [];
    const naves = Array.isArray(json.naves) ? json.naves.map((naveJson: any) => Nave.fromJSON(naveJson)) : [];
    const inventario = Array.isArray(json.inventario) ? json.inventario.map((stockJson: any) => Stock.fromJSON(stockJson)) : [];
    const estrella = json.estrella ? Estrella.fromJSON(json.estrella) : new Estrella();

    return new Planeta(
      json.id,
      json.nombrePlaneta,
      json.imagen,
      productos,
      naves,
      inventario,
      estrella
    );
  }
}
