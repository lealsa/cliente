import { InventarioNave } from "./Inventario";
import { Tripulacion } from "./Tripulacion";

export class Nave {
  id: number;
  foto: string;
  nombreNave: string;
  capacidadCarga: number;
  velocidadMaxima: number;
  tripulacion: Tripulacion[];
  inventarioNave: InventarioNave[];

  constructor(
    id: number = 0,
    foto: string = '',
    nombreNave: string = '',
    capacidadCarga: number = 0,
    velocidadMaxima: number = 0,
    tripulacion: Tripulacion[] = [],
    inventarioNave: InventarioNave[] = []
  ) {
    this.id = id;
    this.foto = foto;
    this.nombreNave = nombreNave;
    this.capacidadCarga = capacidadCarga;
    this.velocidadMaxima = velocidadMaxima;
    this.tripulacion = tripulacion;
    this.inventarioNave = inventarioNave;
  }

  toJSON() {
    return {
      id: this.id,
      foto: this.foto,
      nombreNave: this.nombreNave,
      capacidadCarga: this.capacidadCarga,
      velocidadMaxima: this.velocidadMaxima,
      tripulacion: this.tripulacion.map(member => member.toJSON()),
      inventarioNave: this.inventarioNave.map(item => item.toJSON())
    };
  }

  static fromJSON(json: any): Nave {
    const tripulacion = json.tripulacion.map((memberJson: any) => Tripulacion.fromJSON(memberJson));
    const inventarioNave = json.inventarioNave.map((itemJson: any) => InventarioNave.fromJSON(itemJson));
    return new Nave(
      json.id,
      json.foto,
      json.nombreNave,
      json.capacidadCarga,
      json.velocidadMaxima,
      tripulacion,
      inventarioNave
    );
  }
}
