import { Tripulacion } from "./Tripulacion";

export class Partida {
  id: number;
  tripulacion: Tripulacion[]; // Ensure that the Tripulacion class is already defined and imported.
  puntaje: number;
  cuota: number;

  constructor(
    id: number = 0,
    tripulacion: Tripulacion[] = [],
    puntaje: number = 0,
    cuota: number = 0
  ) {
    this.id = id;
    this.tripulacion = tripulacion;
    this.puntaje = puntaje;
    this.cuota = cuota;
  }

  toJSON() {
    return {
      id: this.id,
      tripulacion: this.tripulacion.map(member => member.toJSON()),  // Serialize each member of the tripulacion
      puntaje: this.puntaje,
      cuota: this.cuota
    };
  }

  static fromJSON(json: any): Partida {
    const tripulacion = json.tripulacion.map((memberJson: any) => Tripulacion.fromJSON(memberJson));
    return new Partida(
      json.id,
      tripulacion,
      json.puntaje,
      json.cuota
    );
  }
}
