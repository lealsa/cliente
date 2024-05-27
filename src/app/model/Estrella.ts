import { Planeta } from "./Planeta";

export class Estrella {
  id: number;
  nombreEstrella: string;
  coordenadaX: number;
  coordenadaY: number;
  coordenadaZ: number;
  imagen: string;
  agujeroDeGusano: number;
  planetas: Planeta[];

  constructor(
    id: number = 0,
    nombreEstrella: string = '',
    coordenadaX: number = 0,
    coordenadaY: number = 0,
    coordenadaZ: number = 0,
    imagen: string = '',
    agujeroDeGusano: number = 0,
    planetas: Planeta[] = []
  ) {
    this.id = id;
    this.nombreEstrella = nombreEstrella;
    this.coordenadaX = coordenadaX;
    this.coordenadaY = coordenadaY;
    this.coordenadaZ = coordenadaZ;
    this.imagen = imagen;
    this.agujeroDeGusano = agujeroDeGusano;
    this.planetas = planetas;
  }

  toJSON() {
    return {
      id: this.id,
      nombreEstrella: this.nombreEstrella,
      coordenadaX: this.coordenadaX,
      coordenadaY: this.coordenadaY,
      coordenadaZ: this.coordenadaZ,
      imagen: this.imagen,
      agujeroDeGusano: this.agujeroDeGusano,
      planetas: this.planetas.map(planeta => planeta.toJSON())
    };
  }

  static fromJSON(json: any): Estrella {
    const planetas = json.planetas.map((planetaJson: any) => Planeta.fromJSON(planetaJson));
    return new Estrella(
      json.id,
      json.nombreEstrella,
      json.coordenadaX,
      json.coordenadaY,
      json.coordenadaZ,
      json.imagen,
      json.agujeroDeGusano,
      planetas
    );
  }
}
