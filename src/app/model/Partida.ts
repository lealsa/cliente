import { Nave } from "./Nave";

export class Partida {
  id: number;
  tiempo: number;  // Tiempo transcurrido en la partida
  puntaje: number;  // Score en el juego
  tiempoMaximo: number;  // Tiempo máximo permitido para la partida
  cuota: number;  // Cuota de entrada para la partida
  creditos: number;  // Créditos ganados en el juego
  nave: Nave;  // Nave asociada a la partida
  tripulacionId:number;

  constructor(
    id: number = 0,
    tiempo: number = 0,
    puntaje: number = 0,
    tiempoMaximo: number = 3,
    cuota: number = 300,
    creditos: number = 0,
    nave: Nave = new Nave(),
    tripulacionId: number,
  ) {
    this.id = id;
    this.tiempo = tiempo;
    this.puntaje = puntaje;
    this.tiempoMaximo = tiempoMaximo;
    this.cuota = cuota;
    this.creditos = creditos;
    this.nave = nave;
    this.tripulacionId = tripulacionId;
  }

  toJSON() {
    return {
      id: this.id,
      tiempo: this.tiempo,
      puntaje: this.puntaje,
      tiempoMaximo: this.tiempoMaximo,
      cuota: this.cuota,
      creditos: this.creditos,
      tripulacionId: this.tripulacionId,
      nave: this.nave.toJSON()  // Suponiendo que nave es relevante y necesita ser serializado.
    };
  }

  static fromJSON(json: any): Partida {
    return new Partida(
      json.id,
      json.tiempo,
      json.puntaje,
      json.tiempoMaximo,
      json.cuota,
      json.creditos,
      Nave.fromJSON(json.nave),
    json.tripulacionId,
  );
  }
}
