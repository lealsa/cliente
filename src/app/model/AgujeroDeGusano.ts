import { Estrella } from "./Estrella";

export class AgujeroDeGusano {
  id: number;
  distancia: number;
  estrellaInicio: Estrella;
  estrellaFin: Estrella;

  constructor(
    id: number = 0,
    distancia: number = 0,
    estrellaInicio: Estrella = new Estrella(),
    estrellaFin: Estrella = new Estrella()
  ) {
    this.id = id;
    this.distancia = distancia;
    this.estrellaInicio = estrellaInicio;
    this.estrellaFin = estrellaFin;
  }

  toJSON() {
    return {
      id: this.id,
      distancia: this.distancia,
      estrellaInicio: this.estrellaInicio.toJSON(), // Serialize estrellaInicio to JSON
      estrellaFin: this.estrellaFin.toJSON() // Serialize estrellaFin to JSON
    };
  }

  static fromJSON(json: any): AgujeroDeGusano {
    return new AgujeroDeGusano(
      json.id,
      json.distancia,
      Estrella.fromJSON(json.estrellaInicio), // Deserialize JSON to Estrella object
      Estrella.fromJSON(json.estrellaFin) // Deserialize JSON to Estrella object
    );
  }
}
