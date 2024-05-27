export class InfoProducto {
    constructor(
        public idInventario: number,
        public nombreProducto: string,
        public cantidad: number,
        public precio: number,
        public oferta: number
    ){}
}
