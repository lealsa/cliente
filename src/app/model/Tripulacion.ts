export class Tripulacion {
  id: number;
  usuarioIds: number[]; // Adjusted to reflect a many-to-many relationship similar to Java's Set<Jugador>
  nave: number;

  constructor(
    id: number = 0,
    usuarioIds: number[] = [],
    nave: number,
  ) {
    this.id = id;
    this.usuarioIds = usuarioIds;
    this.nave = nave;
  }

  toJSON() {
    return {
      id: this.id,
      usuarioIds: this.usuarioIds, // Assuming this would be an array of user IDs
      nave: this.nave,
    };
  }

  static fromJSON(json: any): Tripulacion {
    return new Tripulacion(
      json.id,
      json.usuarioIds, // Assuming the JSON contains an array of user IDs
      json.nave,
    );
  }
}
